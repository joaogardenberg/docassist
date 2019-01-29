module Patients::Validations
  extend ActiveSupport::Concern

  included do
    validates :user,
              presence: true

    validates :name,
              presence: true,
              format: { with: NAME_REGEX },
              length: { maximum: 100 }

    validates :date_of_birth,
              presence: true

    validates :gender,
              presence: true,
              inclusion: { in: self::GENDERS }

    validates :marital_status,
              presence: true,
              inclusion: { in: self::MARITAL_STATUSES }

    validates :occupation,
              length: { maximum: 50 },
              allow_blank: true

    validates :cpf,
              format: { with: CPF_REGEX },
              allow_blank: true

    validates :rg,
              length: { maximum: 50 },
              allow_blank: true

    validates :rg_issuing_agency,
              presence: true,
              length: { maximum: 50 },
              if: :rg?

    validates :nationality,
              presence: true,
              inclusion: { in: self::NATIONALITIES }

    validates :nationality_other,
              presence: true,
              length: { maximum: 50 },
              if: lambda { nationality == Patient::NATIONALITIES.last }

    validates :place_of_birth,
              presence: true,
              inclusion: { in: self::STATES }

    validates :place_of_birth_other,
              presence: true,
              length: { maximum: 50 },
              if: lambda { place_of_birth == Patient::STATES.last }

    validates :landline,
              format: { with: PHONE_REGEX },
              allow_blank: true

    validates :cell_phone,
              format: { with: PHONE_REGEX },
              allow_blank: true

    validates :work_phone,
              format: { with: PHONE_REGEX },
              allow_blank: true

    validates :email,
              format: { with: EMAIL_REGEX },
              length: { maximum: 50 },
              allow_blank: true

    validates :cep,
              format: { with: CEP_REGEX },
              allow_blank: true

    validates :state,
              presence: true,
              inclusion: { in: self::STATES }

    validates :city,
              length: { maximum: 50 },
              allow_blank: true

    validates :neighborhood,
              length: { maximum: 50 },
              allow_blank: true

    validates :address,
              length: { maximum: 100 },
              allow_blank: true

    validates :complement,
              length: { maximum: 100 },
              allow_blank: true

    validate :validate_user_access
    validate :validate_date_of_birth
    validate :validate_cpf

    private

    def validate_user_access
      error = false

      error = true unless current_user.main_user.id == user.main_user.id

      errors.add(:user_id, I18n.t('errors.messages.not_authorized')) if error
    end

    def validate_date_of_birth
      error = false
      error = true unless date_of_birth && date_of_birth <= Date.today
      errors.add(:date_of_birth, I18n.t('errors.messages.invalid')) if error
    end

    def validate_cpf
      if cpf.present?
        error = false
        string = cpf.gsub(/[-\.]/, '')

        first_digit = string[0, string.length - 2]
                      .split('')
                      .each_with_index
                      .reduce(0) do |acc, (curr, i)|
                        acc += curr.to_i * (10 - i);
                      end * 10 % 11

        first_digit = 0 if first_digit == 10
        error = true if first_digit != string[9].to_i

        unless error
          second_digit = string[0, string.length - 1]
                         .split('')
                         .each_with_index
                         .reduce(0) do |acc, (curr, i)|
                           acc += curr.to_i * (11 - i)
                         end * 10 % 11

           second_digit = 0 if second_digit == 10
           error = true if second_digit != string.last.to_i
        end

        errors.add(:cpf, I18n.t('errors.messages.invalid')) if error
      end
    end
  end
end
