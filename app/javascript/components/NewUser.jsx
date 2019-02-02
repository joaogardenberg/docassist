import React                          from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import Form                           from './FormUser';
import * as User                      from '../constants/User';
import * as Users                     from '../services/requests/Users';

let NewUser = props => {
  const { change, untouch, reset, authenticityToken, handleSubmit } = props;
  const { doctors, pristine, submitting, initialValues }            = props;

  return (
    <div className="form">
      <Form
        doctors={ doctors }
        id={ initialValues.id }
        page="new"
        change={ change }
        untouch={ untouch }
        pristine={ pristine }
        submitting={ submitting }
        clearCallback={ reset }
        handleSubmit={ handleSubmit }
        authenticityToken={ authenticityToken }
        submitCallback={ values => onSubmit(values, props) }
      />
    </div>
  );
}

function onSubmit(values, props) {
  const params = {
    ...values,
    authenticity_token: props.authenticityToken,
    oauth_token: props.initialValues.id
  }

  return Users.create(params)
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
    password:              User.validatePasswordNew(values['password']),
    picture:               User.validateUrl(values['picture']),
    background:            User.validateUrl(values['background']),
    type_of_alias:         User.validateTypeOf(
                             values['type'],
                             values['type_of_alias']
                           ),
    email_confirmation:    User.validateEmailConfirmation(
                             values['email'],
                             values['email_confirmation']
                           ),
    password_confirmation: User.validatePasswordConfirmationNew(
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

NewUser = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'NewUserForm'
})(NewUser);

export default NewUser;
