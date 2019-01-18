module Patients::Fields::PersonalInformation
  extend ActiveSupport::Concern

  included do
    field :name,                 type: String
    field :gender,               type: Integer
    field :marital_status,       type: Integer
    field :date_of_birth,        type: Date
    field :occupation,           type: String
    field :cpf,                  type: String
    field :rg,                   type: String
    field :rg_issuing_agency,    type: String
    field :nationality,          type: Integer
    field :nationality_other,    type: String
    field :place_of_birth,       type: Integer
    field :place_of_birth_other, type: String
    field :picture,              type: String
  end
end
