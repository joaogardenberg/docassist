module Patients::Methods
  extend ActiveSupport::Concern

  included do
    def doctor_id
      user_id
    end

    def doctor
      user
    end
  end
end
