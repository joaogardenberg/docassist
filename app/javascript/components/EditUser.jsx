import React, { Component } from 'react';
import { reduxForm }        from 'redux-form';
import Form                 from './FormUser';
import * as Regex           from '../constants/Regex';
import * as User            from '../constants/User';

const INITIAL_STATE = {
  shouldReset: false,
  shouldSubmit: false
}

class EditUser extends Component {
  render() {
    const { change, untouch, authenticityToken, initialValues } = this.props;
    const { doctors }                                           = this.props;
    const { shouldReset, shouldSubmit }                         = this.state;
    const formButtons = this.renderFormButtons();

    return (
      <div className="form">
        <Form
          method="put"
          action={ `/system/users/${initialValues.id}` }
          shouldReset={ shouldReset }
          shouldSubmit={ shouldSubmit }
          change={ change }
          untouch={ untouch }
          authenticityToken={ authenticityToken }
          doctors={ doctors }
          id={ initialValues.id }
        />
        { formButtons }
      </div>
    );
  }

  renderFormButtons() {
    return (
      <div className="row">
        <div className="input-field buttons col s12">
          <button
            className="btn waves-effect waves-light bg-success"
            type="submit"
            onClick={ this.props.handleSubmit(this.onSubmit.bind(this)) }
          >
            <i className="fas fa-save left" />
            Salvar
          </button>
          <button
            className="btn waves-effect waves-light bg-warning"
            onClick={ this.onRestoreButtonClick.bind(this) }
          >
            <i className="fas fa-sync-alt left" />
            Restaurar
          </button>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidUpdate() {
    if (this.state.shouldReset) {
      this.setState({ shouldReset: false });
    }

    if (this.state.shouldSubmit) {
      this.setState({ shouldSubmit: false });
    }
  }

  onRestoreButtonClick() {
    this.restoreForm();
  }

  restoreForm() {
    this.props.reset();
    this.setState({ shouldReset: true });
  }

  onSubmit(values) {
    this.setState({ shouldSubmit: true });
  }
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
  if (password && password.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (password && password.length < 6) {
    return 'Mínimo 6 caracteres';
  }

  return null;
}

function validatePasswordConfirmation(password, passwordConfirmation) {
  if (password && !passwordConfirmation) {
    return 'Campo obrigatório';
  }

  if (password && password !== passwordConfirmation) {
    return 'As senhas não conferem';
  }

  return null;
}

function validate(values) {
  const errors = {
    type:                  validateType(values['type']),
    type_of:               validateTypeOf(values['type'], values['type_of']),
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

EditUser = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'EditUserForm'
})(EditUser);

export default EditUser;
