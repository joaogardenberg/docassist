class SystemController < ActionController::Base
  include Pundit
  protect_from_forgery
  before_action :authenticate_user!

  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  private

  def not_authorized
    redirect_to(:system_dashboard_index)
  end
end
