module System
  class UsersController < SystemController
    respond_to    :html
    before_action :load_user,     only: [:show, :edit, :update, :destroy]
    before_action :load_params,   only: :index
    after_action  :validate_user, only: [:create, :update]

    def index
      @users = User
      @users = @users.where('name' => /.*#{@search}.*/i) if @search.present?
      @users = @users.order(@order[:field] => @order[:direction])
      @users = @users.page(@page)
    end

    def new
      @user = User.new
    end

    def create
      @user = User.new(permitted_attributes)
    end

    def update
      @user = @user.assign_attributes(permitted_attributes)
    end

    def destroy
      @user.delete
      redirect_to(:system_users)
    end

    private

    def permitted_attributes
      params.require(:user)
            .permit(
              :email, :password, :username,
              :type, :type_of, :name,
              :picture, :background
            )
    end

    def permitted_params
      params.permit(:id, :search, :order, :page)
    end

    def load_user
      @user = User.where(id: permitted_params[:id]).first
      redirect_to(:system_users) unless @user
    end

    def validate_user
      @user.save if @user.valid?
      respond_with(@user)
    end

    def load_params
      @search = @search || search
      @order  = @order || order
      @page   = @page || page
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
