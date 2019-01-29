module Users::Validations
  extend ActiveSupport::Concern

  included do
    validates :user, presence: true, unless: :main?
    validates :email, presence: true, uniqueness: true, format: { with: EMAIL_REGEX }, length: { maximum: 50 }
    validates :type, presence: true, inclusion: { in: self::TYPES }
    validates :type_of, presence: true, unless: :doctor?
    # Falta validar se cada valor do type_of é acessível ao current_user
    validates :name, presence: true, format: { with: NAME_REGEX }, length: { maximum: 100 }
    validates :username, presence: true, uniqueness: true, format: { with: USERNAME_REGEX }, length: { maximum: 50 }
    validates :picture, format: { with: URL_REGEX }, allow_blank: true
    validates :background, format: { with: URL_REGEX }, allow_blank: true

    validate :validate_type_of

    private

    def validate_type_of
      type_of&.each do |id|
        doctor = User.where(id: id).first
        no_error = (doctor.main? ? doctor.id : doctor.user_id) == (main? ? id : user_id) if doctor
        errors.add(:type_of, I18n.t('errors.messages.not_authorized')) unless no_error
      end
    end
  end
end
