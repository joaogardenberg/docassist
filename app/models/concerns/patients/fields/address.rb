module Patients::Fields::Address
  extend ActiveSupport::Concern

  included do
    field :cep,          type: String
    field :state,        type: Integer
    field :city,         type: String
    field :neighborhood, type: String
    field :address,      type: String
    field :complement,   type: String
  end
end
