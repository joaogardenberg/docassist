module Patients::Constants
  extend ActiveSupport::Concern

  included do
    GENDERS          = 0..1
    MARITAL_STATUSES = 0..3
    NATIONALITIES    = 0..1
    STATES           = 0..27
  end
end
