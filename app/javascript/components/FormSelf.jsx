import React, { Component } from 'react';
import { Field }            from 'redux-form';
import * as User            from '../constants/User';

// import {
//   uploadUserPicture,
//   uploadUserBackground
// } from '../services/requests/Upload';

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
            { I18n.t('misc.save') }
          </button>
          <button
            className="btn waves-effect waves-light bg-warning"
            type="button"
            disabled={ pristine || submitting }
            onClick={ this.onRestoreButtonClick.bind(this) }
          >
            <i className="fas fa-sync-alt left" />
            { I18n.t('misc.restore') }
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
    this.pictureInputRef              = React.createRef();
    this.backgroundInputRef           = React.createRef();

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

  // onPictureSelect({ target: { files: [file] } }) {
  //   if (file) {
  //     const { id, authenticityToken } = this.props;
  //
  //     this.disablePictureField();
  //
  //     uploadUserPicture(file, id, authenticityToken)
  //       .then(({ status, data: { success, url, errors } }) => {
  //         if (status === 200 && success) {
  //           this.props.change('picture', url);
  //         } else {
  //           this.props.change('picture', '');
  //           alert(errors.picture);
  //         }
  //       })
  //       .then(() => {
  //         this.enablePictureField();
  //       });
  //   }
  // }

  // onBackgroundSelect({ target: { files: [file] } }) {
  //   if (file) {
  //     const { id, authenticityToken } = this.props;
  //
  //     this.disableBackgroundField();
  //
  //     uploadUserBackground(file, id, authenticityToken)
  //       .then(({ status, data: { success, url, errors } }) => {
  //         if (status === 200 && success) {
  //           this.props.change('background', url);
  //         } else {
  //           this.props.change('background', '');
  //           alert(errors.background);
  //         }
  //       })
  //       .then(() => {
  //         this.enableBackgroundField();
  //       });
  //   }
  // }

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

  // disablePictureField() {
  //   this.pictureInputRef.current.disabled = true;
  //   this.setState({ shouldReinitialize: true });
  // }
  //
  // enablePictureField() {
  //   this.pictureInputRef.current.disabled = false;
  //   this.setState({ shouldReinitialize: true });
  // }
  //
  // disableBackgroundField() {
  //   this.backgroundInputRef.current.disabled = true;
  //   this.setState({ shouldReinitialize: true });
  // }
  //
  // enableBackgroundField() {
  //   this.backgroundInputRef.current.disabled = false;
  //   this.setState({ shouldReinitialize: true });
  // }
}

export default FormSelf;
