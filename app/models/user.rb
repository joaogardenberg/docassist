class User
  include Mongoid::Document
  include Users::Fields::Devise
  include Users::Fields::Custom
  include Users::Methods
end
