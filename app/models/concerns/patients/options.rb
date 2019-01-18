module Patients::Options
  extend ActiveSupport::Concern

  included do
    paginates_per 10
  end
end
