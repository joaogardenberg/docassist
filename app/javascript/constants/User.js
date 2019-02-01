import * as Regex from './Regex';

export const TYPES = [
  I18n.t('users.types.doctor'),
  I18n.t('users.types.secretary')
];

export const TYPE_VALUES = [
  '0',
  '1'
]

export function getTypeName(type) {
  const index = TYPE_VALUES.findIndex(t => t === type);

  if (index >= 0) {
    return TYPES[index];
  }

  return null;
}

export function validateType(type) {
  if (!TYPE_VALUES.includes(type)) {
    return I18n.t('errors.messages.wrong_select_value');
  }

  return null;
}

export function validateTypeOf(type, typeOf) {
  if (type === TYPE_VALUES[TYPE_VALUES.length - 1] && (!typeOf || typeOf.length < 1)) {
    return I18n.t('errors.messages.required_field');
  }

  return null;
}

export function validateName(name) {
  if (!name) {
    return I18n.t('errors.messages.required_field');
  }

  if (name.length > 100) {
    return I18n.t('errors.messages.maximum_characters', { number: 100 });
  }

  if (!name.toLowerCase().match(Regex.LowercaseName)) {
    return I18n.t('errors.messages.no_special_characters');
  }

  return null;
}

export function validateUsername(username) {
  if (!username) {
    return I18n.t('errors.messages.required_field');
  }

  if (username.length > 50) {
    return I18n.t('errors.messages.maximum_characters', { number: 50 });
  }

  if (!username.toLowerCase().match(Regex.Username)) {
    return I18n.t('errors.messages.letters_numbers_only');
  }

  return null;
}

export function validateEmail(email) {
  if (!email) {
    return I18n.t('errors.messages.required_field');
  }

  if (email.length > 50) {
    return I18n.t('errors.messages.maximum_characters', { number: 50 });
  }

  if (!email.toLowerCase().match(Regex.Email)) {
    return I18n.t('errors.messages.invalid_email');
  }

  return null;
}

export function validateEmailConfirmation(email, emailConfirmation) {
  if (!emailConfirmation) {
    return I18n.t('errors.messages.required_field');
  }

  if (email !== emailConfirmation) {
    return I18n.t('errors.messages.emails_not_match');
  }

  return null;
}

export function validatePasswordNew(password) {
  if (!password) {
    return I18n.t('errors.messages.required_field');
  }

  if (password.length > 50) {
    return I18n.t('errors.messages.maximum_characters', { number: 50 });
  }

  if (password.length < 6) {
    return I18n.t('errors.messages.minimum_characters', { number: 6 });
  }

  return null;
}

export function validatePasswordEdit(password) {
  if (password) {
    if (password.length > 50) {
      return I18n.t('errors.messages.maximum_characters', { number: 50 });
    }

    if (password.length < 6) {
      return I18n.t('errors.messages.minimum_characters', { number: 6 });
    }
  }

  return null;
}

export function validatePasswordConfirmationNew(password, passwordConfirmation) {
  if (!passwordConfirmation) {
    return I18n.t('errors.messages.required_field');
  }

  if (password !== passwordConfirmation) {
    return I18n.t('errors.messages.passwords_not_match');
  }

  return null;
}

export function validatePasswordConfirmationEdit(password, passwordConfirmation) {
  if (password) {
    if (!passwordConfirmation) {
      return I18n.t('errors.messages.required_field');
    }

    if (password !== passwordConfirmation) {
      return I18n.t('errors.messages.passwords_not_match');
    }
  }

  return null;
}

export function validateUrl(url) {
  if (url) {
    if (url.length > 255) {
      return I18n.t('errors.messages.maximum_characters', { number: 255 });
    }

    if (!url.match(Regex.URL)) {
      return I18n.t('errors.messages.invalid_link');
    }
  }

  return null;
}
