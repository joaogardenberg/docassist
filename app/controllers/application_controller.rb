class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
    redirect_to :system
  end

  def after_sign_out_path_for(resource_or_scope)
    :new_user_session
  end
end
