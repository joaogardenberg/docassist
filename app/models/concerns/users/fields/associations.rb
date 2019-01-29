module Users::Fields::Associations
  extend ActiveSupport::Concern

  included do
    belongs_to :user, optional: true
  end
end
