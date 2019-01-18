module Users::Methods
  extend ActiveSupport::Concern

  included do
    def will_save_change_to_email?
      false
    end

    def type_name
      case type
      when 0
        I18n.t('users.types.secretary')
      when 1
        I18n.t('users.types.doctor')
      else
        I18n.t('users.types.undefined')
      end
    end
  end
end
