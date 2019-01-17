module Users::Fields::Custom
  extend ActiveSupport::Concern

  included do
    field :type,     type: Integer, default: 0
    field :type_of,  type: Array
    field :name,     type: String
    field :username, type: String
  end
end
