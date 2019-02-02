import React                          from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import Axios                          from 'axios';
import Form                           from './FormSelf';
import * as User                      from '../constants/User';

let EditSelf = props => {
  const { change, untouch, reset, authenticityToken, initialValues } = props;
  const { handleSubmit, doctors, pristine, submitting }              = props;

  return (
    <div className="form">
      <Form
        id={ initialValues.id }
        change={ change }
        untouch={ untouch }
        pristine={ pristine }
        submitting={ submitting }
        restoreCallback={ reset }
        handleSubmit={ handleSubmit }
        authenticityToken={ authenticityToken }
        submitCallback={ values => onSubmit(values, props) }
      />
    </div>
  );
}

function onSubmit(values, props) {
  const params = { ...values, authenticity_token: props.authenticityToken }

  return Axios.put('/system/user/update', params)
              .then(({ status, data: { success, errors } }) => {
                if (status === 200 && success) {
                  window.location.href = '/system/dashboard';
                } else {
                  Object.keys(errors).forEach(key => errors[key] = errors[key][0]);
                  throw new SubmissionError(errors);
                }
              });
}

function validate(values) {
  const errors = {
    name:                  User.validateName(values['name']),
    username:              User.validateUsername(values['username']),
    email:                 User.validateEmail(values['email']),
    password:              User.validatePasswordEdit(values['password']),
    picture:               User.validateUrl(values['picture']),
    background:            User.validateUrl(values['background']),
    email_confirmation:    User.validateEmailConfirmation(
                             values['email'],
                             values['email_confirmation']
                           ),
    password_confirmation: User.validatePasswordConfirmationEdit(
                             values['password'],
                             values['password_confirmation']
                           )
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

EditSelf = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'EditSelfForm'
})(EditSelf);

export default EditSelf;
