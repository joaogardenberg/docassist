module System
  class UserController < SystemController
    before_action :load_user

    def update
      @user.assign_attributes(permitted_attributes)

      if @user.valid?
        @user.save && redirect_to(:system_dashboard_index)
      else
        render(action: :edit)
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
