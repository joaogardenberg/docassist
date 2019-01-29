module Patients::Fields::Virtual
  extend ActiveSupport::Concern

  included do
    attr_accessor :current_user
  end
end
