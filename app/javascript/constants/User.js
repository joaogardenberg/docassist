import * as Regex from './Regex';

export const TYPES = [
  'Médico(a)',
  'Secretário(a)'
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
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

export function validateTypeOf(type, typeOf) {
  if (type === TYPE_VALUES[TYPE_VALUES.length - 1] && (!typeOf || typeOf.length < 1)) {
    return 'Campo obrigatório';
  }

  return null;
}

export function validateName(name) {
  if (!name) {
    return 'Campo obrigatório';
  }

  if (name.length > 100) {
    return 'Máximo 100 caracteres';
  }

  if (!name.toLowerCase().match(Regex.LowercaseName)) {
    return 'Não pode conter caracteres especiais';
  }

  return null;
}

export function validateUsername(username) {
  if (!username) {
    return 'Campo obrigatório';
  }

  if (username.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (!username.toLowerCase().match(Regex.Username)) {
    return 'Só pode conter letras e números';
  }

  return null;
}

export function validateEmail(email) {
  if (!email) {
    return 'Campo obrigatório';
  }

  if (email.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (!email.toLowerCase().match(Regex.Email)) {
    return 'E-mail inválido';
  }

  return null;
}

export function validateEmailConfirmation(email, emailConfirmation) {
  if (!emailConfirmation) {
    return 'Campo obrigatório';
  }

  if (email !== emailConfirmation) {
    return 'Os e-mails não conferem';
  }

  return null;
}

export function validatePasswordNew(password) {
  if (!password) {
    return 'Campo obrigatório';
  }

  if (password.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (password.length < 6) {
    return 'Mínimo 6 caracteres';
  }

  return null;
}

export function validatePasswordEdit(password) {
  if (password && password.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (password && password.length < 6) {
    return 'Mínimo 6 caracteres';
  }

  return null;
}

export function validatePasswordConfirmationNew(password, passwordConfirmation) {
  if (!passwordConfirmation) {
    return 'Campo obrigatório';
  }

  if (password !== passwordConfirmation) {
    return 'As senhas não conferem';
  }

  return null;
}

export function validatePasswordConfirmationEdit(password, passwordConfirmation) {
  if (password && !passwordConfirmation) {
    return 'Campo obrigatório';
  }

  if (password && password !== passwordConfirmation) {
    return 'As senhas não conferem';
  }

  return null;
}
