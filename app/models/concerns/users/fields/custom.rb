module Users::Fields::Custom
  extend ActiveSupport::Concern

  included do
    attr_writer :login
    attr_writer :email_confirmation
    attr_writer :password_confirmation

    field :type,       type: Integer, default: 0
    field :type_of,    type: Array,   default: []
    field :name,       type: String,  default: ''
    field :username,   type: String
    field :picture,    type: String,  default: ''
    field :background, type: String,  default: ''
    field :is_main,    type: Boolean, default: false
  end
end
