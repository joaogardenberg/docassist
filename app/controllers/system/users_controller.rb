module System
  class UsersController < SystemController
    respond_to    :html
    before_action :load_params,                    only: :index
    before_action :load_user,                      only: [:edit, :update, :destroy]
    before_action :verify_authorization,           only: [:index, :new, :create]
    before_action :verify_authorization_with_user, only: [:edit, :update, :destroy]
    before_action :load_doctors,                   only: [:new, :edit]

    def index
      @users = User.where(user_id: current_user.id)
      @users = @users.where('name' => /.*#{@search}.*/i) if @search.present?
      @users = @users.order(@order[:field] => @order[:direction])
      @users = @users.page(@page)
    end

    def new
      @user = User.new
    end

    def create
      @user = User.new(permitted_attributes)

      if @user.valid?
        @user.save && render(status: :ok, json: { success: true })
      else
        render(status: :ok, json: { success: false, errors: @user.errors })
      end
    end

    def update
      @user.assign_attributes(permitted_attributes)

      if @user.valid?
        @user.save && render(status: :ok, json: { success: true })
      else
        render(status: :ok, json: { success: false, errors: @user.errors })
      end
    end

    def destroy
      delete_images
      @user.delete
      redirect_to(:system_users)
    end

    def upload_picture
      picture_upload
    end

    def upload_background
      background_upload
    end

    private

    def permitted_attributes
      ret = params.permit(
              :username, :name, :type,
              :email, :email_confirmation, :password,
              :password_confirmation, :picture, :background
            )
            .merge(
              user: current_user,
              type_of: params[:type_of].present? ? params[:type_of]&.map do |id|
                BSON::ObjectId(id)
              end : []
            )

      ret[:_id] = BSON::ObjectId(params[:oauth_token]) if params[:oauth_token].present?

      ret
    end

    def permitted_params
      params.permit(:id, :search, :order, :page, :file)
    end

    def load_params
      @search = @search || search
      @order  = @order || order
      @page   = @page || page
    end

    def load_user
      @user = User.where(id: permitted_params[:id]).first
      redirect_to(:system_users) unless @user
    end

    def verify_authorization
      authorize(:user)
    end

    def verify_authorization_with_user
      authorize(@user)
    end

    def load_doctors
      @doctors = User.where(type: 0, user_id: current_user.id)
    end

    def search
      permitted_params[:search]
    end

    def order
      param = permitted_params[:order]

      if param.present? && param.include?('-')
        field, direction = param.split('-')

        return {
          field: field.to_sym,
          direction: direction.to_sym
        } if User.fields.pluck(0).include?(field) &&
             ['asc', 'desc'].include?(direction)
      end

      return {
        field: :name,
        direction: :asc
      }
    end

    def page
      permitted_params[:page] || 1
    end

    def picture_upload
      file = permitted_params[:file].tempfile

      if file.present?
        if file.size <= 5.megabytes
          type = permitted_params[:file].content_type

          if ::Image.types.include?(type)
            url = ::Image.upload("users/pictures/#{permitted_params[:id]}", permitted_params[:file].tempfile)

            S3::Users::PictureCleanerWorker.perform_in(1.day, id: permitted_params[:id])

            render(status: :ok, json: { success: true, url: url })
          else
            render(status: :ok, json: { success: false, errors: { picture: I18n.t('errors.messages.not_an_image') } })
          end
        else
          render(status: :ok, json: { success: false, errors: { picture: I18n.t('errors.messages.bigger_than_image', size: '5MB') } })
        end
      else
        render(status: :ok, json: { success: false, errors: { picture: I18n.t('errors.messages.invalid_image') } })
      end
    end

    def background_upload
      file = permitted_params[:file].tempfile

      if file.present?
        if file.size <= 5.megabytes
          type = permitted_params[:file].content_type

          if ::Image.types.include?(type)
            url = ::Image.upload("users/backgrounds/#{permitted_params[:id]}", permitted_params[:file].tempfile)

            S3::Users::BackgroundCleanerWorker.perform_in(1.day, id: permitted_params[:id])

            render(status: :ok, json: { success: true, url: url })
          else
            render(status: :ok, json: { success: false, errors: { background: I18n.t('errors.messages.not_an_image') } })
          end
        else
          render(status: :ok, json: { success: false, errors: { background: I18n.t('errors.messages.bigger_than_image', size: '5MB') } })
        end
      else
        render(status: :ok, json: { success: false, errors: { background: I18n.t('errors.messages.invalid_image') } })
      end
    end

    def delete_images
      picture_path = "users/pictures/#{@user.id}"
      background_path = "users/backgrounds/#{@user.id}"

      ::Image.delete(picture_path) if @user.picture.present? && @user.picture == ::Image.get_url(picture_path)
      ::Image.delete(background_path) if @user.background.present? && @user.background == ::Image.get_url(background_path)
    end

    def not_authorized
      redirect_to(:system_users)
    end
  end
end
