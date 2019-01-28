module Patients::Options
  extend ActiveSupport::Concern

  included do
    belongs_to :user
    paginates_per 10
  end
end
