import React, { Component } from 'react';
import { Field }            from 'redux-form';
import * as User            from '../constants/User';

const INITIAL_STATE = {
  showTypeOf: false,
  shouldResetSelects: false,
  shouldResetCounters: false
}

class FormUser extends Component {
  render() {
    const { method, action, handleSubmit } = this.props;
    const { showTypeOf }                   = this.state;

    const formButtons = this.renderFormButtons();
    let addMethod;

    if (method) {
      addMethod = <input type="hidden" name="_method" value={ method } />;
    }

    return (
      <form
        method="post"
        action={ action }
        ref={ this.formRef }
        onSubmit={ handleSubmit(this.onSubmit.bind(this)) }
      >
        { addMethod }
        <input type="hidden" name="authenticity_token" value={ this.props.authenticityToken } />
        <input type="hidden" name="type_of" ref={ this.typeOfHiddenRef } />
        <div className="row">
          <Field
            id="type"
            name="type"
            label="Tipo"
            className={ `col ${showTypeOf ? 'l2 m6 s12' : 'l6 s12'}` }
            reference={ this.typeSelectRef }
            component={ this.renderSelect }
            onChange={ event => this.onTypeChange(event) }
          >
            { this.renderTypeOptions() }
          </Field>
          <div className="col l4 m6 s12" style={{ display: showTypeOf ? 'block' : 'none' }}>
            <Field
              id="type_of_alias"
              name="type_of_alias"
              label="Secretário(a) de quem(ns)?"
              reference={ this.typeOfSelectRef }
              multiple={ true }
              format={ value => value || [] }
              component={ this.renderSelect }
            >
              { this.renderDoctorOptions() }
            </Field>
          </div>
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
    const { restoreCallback, clearCallback } = this.props;
    let submitIcon, submitText, restoreIcon, restoreText, restoreFunc;

    if (restoreCallback) {
      submitIcon = 'fas fa-save';
      submitText = 'Salvar';
      restoreIcon = 'fas fa-sync-alt';
      restoreText = 'Restaurar';
      restoreFunc = restoreCallback;
    } else {
      submitIcon = 'fas fa-plus';
      submitText = 'Criar';
      restoreIcon = 'fas fa-eraser';
      restoreText = 'Limpar';
      restoreFunc = clearCallback;
    }

    return (
      <div className="row">
        <div className="input-field buttons col s12">
          <button
            className="btn waves-effect waves-light bg-success"
            type="submit"
          >
            <i className={ `${submitIcon} left` } />
            { submitText }
          </button>
          <button
            className="btn waves-effect waves-light bg-warning"
            type="button"
            onClick={ () => this.onRestoreButtonClick(restoreFunc) }
          >
            <i className={ `${restoreIcon} left` } />
            { restoreText }
          </button>
        </div>
      </div>
    );
  }

  renderTypeOptions() {
    return User.TYPES.map((type, index) => {
      const value = User.TYPE_VALUES[index];
      return <option key={ value } value={ value } >{ type }</option>;
    });
  }

  renderDoctorOptions() {
    const { doctors, id } = this.props;

    const docs = doctors.filter(doctor => doctor.id !== id);

    return docs.map(doctor => <option key={ doctor.id } value={ doctor.id }>{ doctor.name }</option>);
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

  renderSelect(field) {
    const { input, id, label, className, children, reference }     = field;
    const { disabled, multiple, style }                            = field;
    const { touched, active, error }                               = field.meta;

    const errorMessage = touched && !active ? error : '';
    const valid        = touched && !active && !errorMessage;

    return (
      <div
        className={ `input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }
        style={ style }
      >
        <select
          { ...input }
          id={ id }
          ref={ reference }
          disabled={ disabled }
          multiple={ multiple }
          onChange={ event => { input.onChange(event); input.onBlur(event) } }
        >
          { children }
        </select>
        <label>{ label }</label>
        <span className="helper-text">{ errorMessage }</span>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state                        = INITIAL_STATE;

    this.formRef                      = React.createRef();

    this.typeSelectRef                = React.createRef();
    this.typeOfSelectRef              = React.createRef();
    this.typeOfHiddenRef              = React.createRef();
    this.nameInputRef                 = React.createRef();
    this.usernameInputRef             = React.createRef();
    this.emailInputRef                = React.createRef();
    this.emailConfirmationInputRef    = React.createRef();
    this.passwordInputRef             = React.createRef();
    this.passwordConfirmationInputRef = React.createRef();
    this.typeSelectLoaded             = false;
    this.typeOfSelectLoaded           = false;

    this.countersLoaded               = false;
  }

  componentDidUpdate() {
    this.initFormCounters();
    this.initFormSelects();
    M.updateTextFields();
    this.updateFields();

    if (this.state.shouldResetSelects || this.state.shouldResetCounters) {
      this.setState({ shouldResetSelects: false, shouldResetCounters: false });
    }
  }

  onTypeChange({ target: { options } }) {
    if (options[options.selectedIndex].value === '1' && this.state.showTypeOf === false) {
      this.setState({ showTypeOf: true });
    } else if (options[options.selectedIndex].value !== '1' && this.state.showTypeOf === true) {
      this.props.change('type_of_alias', '');
      this.props.untouch('type_of_alias');
      this.setState({ showTypeOf: false, shouldResetSelects: true });
    }
  }

  onRestoreButtonClick(callback) {
    callback();
    this.setState({ shouldResetSelects: true, shouldResetCounters: true });
  }

  onSubmit(values) {
    if (this.typeOfHiddenRef.current && values.type_of_alias) {
      this.typeOfHiddenRef.current.value = values.type_of_alias;
    }

    this.formRef.current.submit();
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

  initFormSelects() {
    const { typeSelectLoaded, typeOfSelectLoaded, typeSelectRef } = this;
    const { typeOfSelectRef }                                     = this;
    const { shouldResetSelects }                                  = this.state;

    if (shouldResetSelects || (!typeSelectLoaded && typeSelectRef.current)) {
      M.FormSelect.init(typeSelectRef.current);
      this.typeSelectLoaded = true;
    }

    if (shouldResetSelects  || (!typeOfSelectLoaded && typeOfSelectRef.current)) {
      M.FormSelect.init(typeOfSelectRef.current);
      this.typeOfSelectLoaded = true;
    }
  }

  updateFields() {
    this.onTypeChange({ target: { options: this.typeSelectRef.current.options } });
  }
}

export default FormUser;
