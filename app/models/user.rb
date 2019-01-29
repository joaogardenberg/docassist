class User
  include Mongoid::Document
  include Users::Options
  include Users::Fields::Associations
  include Users::Fields::Virtual
  include Users::Fields::Devise
  include Users::Fields::Custom
  include Users::Constants
  include Users::Methods
  include Users::Validations
end
