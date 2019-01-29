import React, { Component } from 'react';
import { Field }            from 'redux-form';
import * as User            from '../constants/User';

const INITIAL_STATE = {
  shouldResetCounters: false
}

class FormSelf extends Component {
  render() {
    const { method, action, handleSubmit, submitCallback } = this.props;

    const formButtons = this.renderFormButtons();

    return (
      <form
        onSubmit={ handleSubmit(submitCallback) }
      >
        <div className="row">
          <Field
            id="name"
            name="name"
            type="text"
            label="Nome"
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="100"
            reference={ this.nameInputRef }
            component={ this.renderField }
          />
          <Field
            id="username"
            name="username"
            type="text"
            label="Usuário"
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.usernameInputRef }
            component={ this.renderField }
          />
          <Field
            id="email"
            name="email"
            type="email"
            label="E-mail"
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.emailInputRef }
            component={ this.renderField }
          />
          <Field
            id="email_confirmation"
            name="email_confirmation"
            type="email"
            label="Confirmação de e-mail"
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.emailConfirmationInputRef }
            component={ this.renderField }
          />
          <Field
            id="password"
            name="password"
            type="password"
            label="Senha"
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.passwordInputRef }
            component={ this.renderField }
          />
          <Field
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            label="Confirmação de senha"
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.passwordConfirmationInputRef }
            component={ this.renderField }
          />
        </div>
        { formButtons }
      </form>
    );
  }

  renderFormButtons() {
    const { pristine, submitting } = this.props;

    return (
      <div className="row">
        <div className="input-field buttons col s12">
          <button
            className="btn waves-effect waves-light bg-success"
            type="submit"
            disabled={ submitting }
          >
            <i className="fas fa-save left" />
            Salvar
          </button>
          <button
            className="btn waves-effect waves-light bg-warning"
            type="button"
            disabled={ pristine || submitting }
            onClick={ this.onRestoreButtonClick.bind(this) }
          >
            <i className="fas fa-sync-alt left" />
            Restaurar
          </button>
        </div>
      </div>
    );
  }

  renderField(field) {
    const { input, id, type, label, className, disabled, style }     = field;
    const { reference, maxLength, meta: { touched, active, error } } = field;

    const errorMessage = touched && !active ? error : '';
    const valid        = touched && !active && !errorMessage;

    return (
      <div
        className={ `input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }
        style={ style }
      >
        <input
          { ...input }
          id={ id }
          type={ type }
          ref={ reference }
          maxLength={ maxLength }
          data-length={ maxLength }
          disabled={ disabled }
        />
        <label htmlFor={ id }>{ label }</label>
        <span className="helper-text">{ errorMessage }</span>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state                        = INITIAL_STATE;

    this.nameInputRef                 = React.createRef();
    this.usernameInputRef             = React.createRef();
    this.emailInputRef                = React.createRef();
    this.emailConfirmationInputRef    = React.createRef();
    this.passwordInputRef             = React.createRef();
    this.passwordConfirmationInputRef = React.createRef();

    this.countersLoaded               = false;
  }

  componentDidUpdate() {
    this.initFormCounters();
    M.updateTextFields();

    if (this.state.shouldResetCounters) {
      this.setState({ shouldResetCounters: false });
    }
  }

  onRestoreButtonClick() {
    this.props.restoreCallback();
    this.setState({ shouldResetCounters: true });
  }

  initFormCounters() {
    const { countersLoaded } = this;
    const { shouldResetCounters } = this.props;

    if (shouldResetCounters || !countersLoaded) {
      const elements = [
        this.nameInputRef.current,
        this.usernameInputRef.current,
        this.emailInputRef.current,
        this.emailConfirmationInputRef.current,
        this.passwordInputRef.current,
        this.passwordConfirmationInputRef.current
      ];

      elements.forEach(element => {
        if (element) {
          M.CharacterCounter.init(element);
        }
      });

      this.countersLoaded = true;
    }
  }
}

export default FormSelf;
