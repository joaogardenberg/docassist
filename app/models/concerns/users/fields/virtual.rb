module Users::Fields::Virtual
  extend ActiveSupport::Concern

  included do
    attr_writer   :login
    attr_accessor :email_confirmation
    attr_writer   :password_confirmation
  end
end
