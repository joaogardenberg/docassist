module Patients::Fields::Contact
  extend ActiveSupport::Concern

  included do
    field :landline,   type: String, default: ''
    field :cell_phone, type: String, default: ''
    field :work_phone, type: String, default: ''
    field :email,      type: String, default: ''
  end
end
