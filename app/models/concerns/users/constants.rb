module Users::Constants
  extend ActiveSupport::Concern

  included do
    TYPES = [0, 1]
  end
end
