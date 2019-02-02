module Users::Methods
  extend ActiveSupport::Concern

  included do
    before_validation do
      self.user = self if is_main && !user
      type_of = [] if type == 0
    end

    before_update do
      picture_path = "users/pictures/#{id}"
      background_path = "users/backgrounds/#{id}"

      Image.delete(picture_path) if picture_changed? && picture_was == Image.get_url(picture_path)
      Image.delete(background_path) if background_changed? && background_was == Image.get_url(background_path)
    end

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
      if type == 0
        Patient.where(user_id: id)
      else
        Patient.where(:user_id.in => type_of.filter do |id|
                                       User.where(id: id)&.first&.doctor?
                                     end
        )
      end
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
      user
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
