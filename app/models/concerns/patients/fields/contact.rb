module Patients::Fields::Contact
  extend ActiveSupport::Concern

  included do
    field :landline,   type: String
    field :cell_phone, type: String
    field :work_phone, type: String
    field :email,      type: String
  end
end
