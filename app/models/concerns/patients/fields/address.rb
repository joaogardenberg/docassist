module Patients::Fields::Address
  extend ActiveSupport::Concern

  included do
    field :cep,          type: String,  default: ''
    field :state,        type: Integer, default: 18
    field :city,         type: String,  default: ''
    field :neighborhood, type: String,  default: ''
    field :address,      type: String,  default: ''
    field :complement,   type: String,  default: ''
  end
end
