class Patient
  include Mongoid::Document
  include Patients::Options
  include Patients::Fields::Associations
  include Patients::Fields::Virtual
  include Patients::Fields::PersonalInformation
  include Patients::Fields::Contact
  include Patients::Fields::Address
  include Patients::Fields::PersonalHistory
  include Patients::Fields::Habits
  include Patients::Fields::FamilyHistory
  include Patients::Constants
  include Patients::Methods
  include Patients::Validations
end
