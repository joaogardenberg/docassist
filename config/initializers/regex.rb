NAME_REGEX     = /\A[a-zA-ZáéíóúàèâêôãõäöüÁÉÍÓÚÀÈÂÊÔÃÕÄÖÜ0-9'\s]+\z/.freeze
USERNAME_REGEX = /\A[a-z0-9]+\z/.freeze
EMAIL_REGEX    = /\A[^@]+@[^@]+\.[^@]+\z/.freeze
CPF_REGEX      = /\A\d{3}\.\d{3}\.\d{3}-\d{2}\z/.freeze
PHONE_REGEX    = /\A\(\d{2}\)\s\d{4,5}-\d{4}\z/.freeze
CEP_REGEX      = /\A\d{5}-\d{3}\z/.freeze
URL_REGEX      = /\A(http|https):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/.*)?(\?.*)?\z/.freeze
