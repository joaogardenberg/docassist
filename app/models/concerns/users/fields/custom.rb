module Users::Fields::Custom
  extend ActiveSupport::Concern

  included do
    field :type,       type: Integer, default: 0
    field :type_of,    type: Array,   default: []
    field :name,       type: String,  default: ''
    field :username,   type: String
    field :picture,    type: String
    field :background, type: String
    field :is_main,    type: Boolean, default: false
  end
end
