import React         from 'react';
import { reduxForm } from 'redux-form';
import Form          from './FormUser';
import * as User     from '../constants/User';

let EditUser = props => {
  const { change, untouch, reset, authenticityToken, initialValues } = props;
  const { handleSubmit, doctors }                                    = props;

  return (
    <div className="form">
      <Form
        doctors={ doctors }
        id={ initialValues.id }
        method="put"
        action={ `/system/users/${initialValues.id}` }
        change={ change }
        untouch={ untouch }
        restoreCallback={ reset }
        handleSubmit={ handleSubmit }
        authenticityToken={ authenticityToken }
      />
    </div>
  );
}

function validate(values) {
  const errors = {
    type:                  User.validateType(values['type']),
    type_of_alias:         User.validateTypeOf(values['type'], values['type_of_alias']),
    name:                  User.validateName(values['name']),
    username:              User.validateUsername(values['username']),
    email:                 User.validateEmail(values['email']),
    email_confirmation:    User.validateEmailConfirmation(values['email'], values['email_confirmation']),
    password:              User.validatePasswordEdit(values['password']),
    password_confirmation: User.validatePasswordConfirmationEdit(values['password'], values['password_confirmation'])
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
