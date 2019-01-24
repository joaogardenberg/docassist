import React         from 'react';
import { reduxForm } from 'redux-form';
import Form          from './FormUser';
import * as Regex    from '../constants/Regex';
import * as User     from '../constants/User';

let NewUser = props => {
  const { change, untouch, reset, authenticityToken, handleSubmit } = props;
  const { doctors }                                                 = props;

  return (
    <div className="form">
      <Form
        doctors={ doctors }
        action="/system/users"
        change={ change }
        untouch={ untouch }
        clearCallback={ reset }
        handleSubmit={ handleSubmit }
        authenticityToken={ authenticityToken }
      />
    </div>
  );
}

function validateType(type) {
  if (!User.TYPE_VALUES.includes(type)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

function validateTypeOf(type, typeOf) {
  if (type === User.TYPE_VALUES[User.TYPE_VALUES.length - 1] && (!typeOf || typeOf.length < 1)) {
    return 'Campo obrigatório';
  }

  return null;
}

function validateName(name) {
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

function validateUsername(username) {
  if (!username) {
    return 'Campo obrigatório';
  }

  if (username.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (!username.toLowerCase().match(Regex.Username)) {
    return 'Só pode conter letras e números'
  }

  return null;
}

function validateEmail(email) {
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

function validateEmailConfirmation(email, emailConfirmation) {
  if (!emailConfirmation) {
    return 'Campo obrigatório';
  }

  if (email !== emailConfirmation) {
    return 'Os e-mails não conferem';
  }

  return null;
}

function validatePassword(password) {
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

function validatePasswordConfirmation(password, passwordConfirmation) {
  if (!passwordConfirmation) {
    return 'Campo obrigatório';
  }

  if (password !== passwordConfirmation) {
    return 'As senhas não conferem';
  }

  return null;
}

function validate(values) {
  const errors = {
    type:                  validateType(values['type']),
    type_of_alias:         validateTypeOf(values['type'], values['type_of_alias']),
    name:                  validateName(values['name']),
    username:              validateUsername(values['username']),
    email:                 validateEmail(values['email']),
    email_confirmation:    validateEmailConfirmation(values['email'], values['email_confirmation']),
    password:              validatePassword(values['password']),
    password_confirmation: validatePasswordConfirmation(values['password'], values['password_confirmation'])
  };

  const ret = Object.keys(errors).reduce((final, key) => {
    if (errors[key]) {
      final[key] = errors[key];
      return final;
    }

    return final;
  }, {});

  return ret;
}

NewUser = reduxForm({
  validate,
  initialValues: {
    type: '0'
  },
  enableReinitialize: true,
  form: 'NewUserForm'
})(NewUser);

export default NewUser;
