module System
  class UserController < SystemController
    before_action :load_user

    def update
      @user.assign_attributes(permitted_attributes)

      if @user.valid?
        @user.save && render(status: :ok, json: { success: true })
      else
        render(status: :ok, json: { success: false, errors: @user.errors })
      end
    end

    private

    def permitted_attributes
      params.permit(
              :username, :name, :picture,
              :email, :email_confirmation,
              :password, :password_confirmation,
              :background
            )
    end

    def load_user
      @user = current_user
      redirect_to(:system_dashboard_index) unless @user
    end
  end
end
