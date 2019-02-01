import React, { Component } from 'react';
import { Field }            from 'redux-form';
import * as User            from '../constants/User';

import {
  uploadUserPicture,
  uploadUserBackground
} from '../services/requests/Upload';

const INITIAL_STATE = {
  showTypeOf: false,
  shouldResetSelects: false,
  shouldResetCounters: false
}

class FormUser extends Component {
  render() {
    const { method, action, handleSubmit, submitCallback } = this.props;
    const { showTypeOf }                                   = this.state;

    const formButtons = this.renderFormButtons();

    return (
      <form
        onSubmit={ handleSubmit(submitCallback) }
      >
        <div className="row">
          <Field
            id="type"
            name="type"
            label={ I18n.t('users.attributes.type') }
            className={ `col ${showTypeOf ? 'l2 m6 s12' : 'l6 s12'}` }
            reference={ this.typeSelectRef }
            component={ this.renderSelect }
            onChange={ event => this.onTypeChange(event) }
          >
            { this.renderTypeOptions() }
          </Field>
          <div className="col l4 m6 s12" style={{ display: showTypeOf ? 'block' : 'none' }}>
            <Field
              id="type_of"
              name="type_of"
              label={ I18n.t('users.form.type_of_label') }
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
            label={ I18n.t('users.attributes.name') }
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
            label={ I18n.t('users.attributes.username') }
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
            label={ I18n.t('users.attributes.email') }
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
            label={ I18n.t('users.attributes.email_confirmation') }
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
            label={ I18n.t('users.attributes.password') }
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
            label={ I18n.t('users.attributes.password_confirmation') }
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.passwordConfirmationInputRef }
            component={ this.renderField }
          />
          <Field
            id="picture"
            name="picture"
            label={ I18n.t('users.form.picture_label') }
            className="col m6 s12"
            autoComplete="off"
            maxLength="255"
            reference={ this.pictureInputRef }
            selectFileCallback={ this.onPictureSelect.bind(this) }
            component={ this.renderFileField }
          />
          <Field
            id="background"
            name="background"
            label={ I18n.t('users.form.background_label') }
            className="col m6 s12"
            autoComplete="off"
            maxLength="255"
            reference={ this.backgroundInputRef }
            selectFileCallback={ this.onBackgroundSelect.bind(this) }
            component={ this.renderFileField }
          />
        </div>
        { formButtons }
      </form>
    );
  }

  renderFormButtons() {
    const { page, restoreCallback, clearCallback, pristine } = this.props;
    const { submitting }                                     = this.props;
    let submitIcon, submitText, restoreIcon, restoreText, restoreFunc;

    if (page === 'new') {
      submitIcon = 'fas fa-plus';
      submitText = I18n.t('misc.create');
      restoreIcon = 'fas fa-eraser';
      restoreText = I18n.t('misc.clear');
      restoreFunc = clearCallback;
    } else {
      submitIcon = 'fas fa-save';
      submitText = I18n.t('misc.save');
      restoreIcon = 'fas fa-sync-alt';
      restoreText = I18n.t('misc.restore');
      restoreFunc = restoreCallback;
    }

    return (
      <div className="row">
        <div className="input-field buttons col s12">
          <button
            className="btn waves-effect waves-light bg-success"
            type="submit"
            disabled={ submitting }
          >
            <i className={ `${submitIcon} left` } />
            { submitText }
          </button>
          <button
            className="btn waves-effect waves-light bg-warning"
            type="button"
            disabled={ pristine || submitting }
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

  renderFileField(field) {
    const { input, id, label, className, disabled, style } = field;
    const { reference, fileReference, maxLength }          = field;
    const { selectFileCallback }                           = field;
    const { touched, active, error }                       = field.meta;

    const errorMessage = touched && !active ? error : '';
    const valid        = touched && !active && !errorMessage;

    return (
      <div
        className={ `file input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }
        style={ style }
      >
        <input
          { ...input }
          id={ id }
          type="text"
          ref={ reference }
          maxLength={ maxLength }
          disabled={ disabled }
        />
        <div className="file-field">
          <div className="upload btn-flat waves-effect">
            <i className="fas fa-upload" />
            <input
              id={ `${id}_alias` }
              name={ `${input.name}_alias` }
              type="file"
              disabled={ disabled }
              ref={ fileReference }
              onChange={ selectFileCallback }
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path" type="text" disabled={ disabled } />
          </div>
        </div>
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

    this.typeSelectRef                = React.createRef();
    this.typeOfSelectRef              = React.createRef();
    this.nameInputRef                 = React.createRef();
    this.usernameInputRef             = React.createRef();
    this.emailInputRef                = React.createRef();
    this.emailConfirmationInputRef    = React.createRef();
    this.passwordInputRef             = React.createRef();
    this.passwordConfirmationInputRef = React.createRef();
    this.pictureInputRef              = React.createRef();
    this.backgroundInputRef           = React.createRef();

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
      this.props.change('type_of', '');
      this.props.untouch('type_of');
      this.setState({ showTypeOf: false, shouldResetSelects: true });
    }
  }

  onRestoreButtonClick(callback) {
    callback();
    this.setState({ shouldResetSelects: true, shouldResetCounters: true });
  }

  onPictureSelect({ target: { files: [file] } }) {
    if (file) {
      const { id, authenticityToken } = this.props;

      this.disablePictureField();

      uploadUserPicture(file, id, authenticityToken)
        .then(({ status, data: { url } }) => {
          this.props.change('picture', url);
        })
        .then(() => {
          this.enablePictureField();
        });
    }
  }

  onBackgroundSelect({ target: { files: [file] } }) {
    if (file) {
      const { id, authenticityToken } = this.props;

      this.disableBackgroundField();

      uploadUserBackground(file, id, authenticityToken)
        .then(({ status, data: { url } }) => {
          this.props.change('background', url);
        })
        .then(() => {
          this.enableBackgroundField();
        });
    }
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

  disablePictureField() {
    this.pictureInputRef.current.disabled = true;
    this.setState({ shouldReinitialize: true });
  }

  enablePictureField() {
    this.pictureInputRef.current.disabled = false;
    this.setState({ shouldReinitialize: true });
  }

  disableBackgroundField() {
    this.backgroundInputRef.current.disabled = true;
    this.setState({ shouldReinitialize: true });
  }

  enableBackgroundField() {
    this.backgroundInputRef.current.disabled = false;
    this.setState({ shouldReinitialize: true });
  }
}

export default FormUser;
