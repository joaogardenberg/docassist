module Patients::Fields::PersonalInformation
  extend ActiveSupport::Concern

  included do
    field :name,                 type: String,  default: ''
    field :gender,               type: Integer, default: 0
    field :marital_status,       type: Integer, default: 0
    field :date_of_birth,        type: Date
    field :occupation,           type: String,  default: ''
    field :cpf,                  type: String,  default: ''
    field :rg,                   type: String,  default: ''
    field :rg_issuing_agency,    type: String,  default: ''
    field :nationality,          type: Integer, default: 0
    field :nationality_other,    type: String,  default: ''
    field :place_of_birth,       type: Integer, default: 18
    field :place_of_birth_other, type: String,  default: ''
    field :picture,              type: String,  default: ''
  end
end
