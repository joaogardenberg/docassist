import React                          from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import Axios                          from 'axios';
import Form                           from './FormUser';
import * as User                      from '../constants/User';

let EditUser = props => {
  const { change, untouch, reset, authenticityToken, initialValues } = props;
  const { handleSubmit, doctors, pristine, submitting }              = props;

  return (
    <div className="form">
      <Form
        doctors={ doctors }
        id={ initialValues.id }
        page="edit"
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

  return Axios.patch(`/system/users/${props.initialValues.id}`, params)
              .then(({ status, data: { success, errors } }) => {
                if (status === 200 && success) {
                  window.location.href = '/system/users';
                } else {
                  Object.keys(errors).forEach(key => errors[key] = errors[key][0]);
                  throw new SubmissionError(errors);
                }
              });
}

function validate(values) {
  const errors = {
    type:                  User.validateType(values['type']),
    name:                  User.validateName(values['name']),
    username:              User.validateUsername(values['username']),
    email:                 User.validateEmail(values['email']),
    password:              User.validatePasswordEdit(values['password']),
    type_of_alias:         User.validateTypeOf(
                             values['type'],
                             values['type_of_alias']
                           ),
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

EditUser = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'EditUserForm'
})(EditUser);

export default EditUser;
