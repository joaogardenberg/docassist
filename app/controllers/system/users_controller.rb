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
      ::Image.delete(@user.picture)
      ::Image.delete(@user.background)
      @user.delete
      redirect_to(:system_users)
    end

    def upload_picture
      url = ::Image.upload("users/pictures/#{permitted_params[:id]}", permitted_params[:file].tempfile)
      render json: { url: url }
    end

    def upload_background
      url = ::Image.upload("users/backgrounds/#{permitted_params[:id]}", permitted_params[:file].tempfile)
      render json: { url: url }
    end

    private

    def permitted_attributes
      params.permit(
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
  end
end
