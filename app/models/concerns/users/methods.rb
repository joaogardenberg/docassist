module Users::Methods
  extend ActiveSupport::Concern

  included do
    def will_save_change_to_email?
      false
    end

    def type_name
      case type
      when 0
        I18n.t('users.types.doctor')
      when 1
        I18n.t('users.types.secretary')
      else
        I18n.t('users.types.undefined')
      end
    end

    def doctor?
      type == 0
    end

    def doctors
      User.where(type: 0, user_id: is_main ? id : user_id, :id.in => type_of)
    end

    def patients
      Patient.where(:user_id.in => type == 0 ? [id] : type_of)
    end

    def password_required?
      new_record? || password.present? || password_confirmation.present?
    end

    def login
      @login || self.username || self.email
    end

    def main?
      is_main
    end

    def main_user_id
      user_id
    end

    def main_user
      User.where(id: user_id).first
    end

    def self.find_first_by_auth_conditions(warden_conditions)
      conditions = warden_conditions.dup
      if login = conditions.delete(:login)
        self.any_of({ :username =>  /^#{Regexp.escape(login)}$/i }, { :email =>  /^#{Regexp.escape(login)}$/i }).first
      else
        super
      end
    end
  end
end
