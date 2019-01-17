class ApplicationController < ActionController::Base
  def index
    redirect_to :system
  end
end
