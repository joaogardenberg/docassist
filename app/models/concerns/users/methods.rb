module Users::Methods
  extend ActiveSupport::Concern

  included do
    def will_save_change_to_email?
      false
    end
  end
end
