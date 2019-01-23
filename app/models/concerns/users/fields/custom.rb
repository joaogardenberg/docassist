module Users::Fields::Custom
  extend ActiveSupport::Concern

  included do
    attr_writer :login

    field :type,       type: Integer, default: 0
    field :type_of,    type: Array
    field :name,       type: String
    field :username,   type: String
    field :picture,    type: String
    field :background, type: String
  end
end
