import React         from 'react';
import { reduxForm } from 'redux-form';
import Form          from './FormUser';
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

function validate(values) {
  const errors = {
    type:                  User.validateType(values['type']),
    type_of_alias:         User.validateTypeOf(values['type'], values['type_of_alias']),
    name:                  User.validateName(values['name']),
    username:              User.validateUsername(values['username']),
    email:                 User.validateEmail(values['email']),
    email_confirmation:    User.validateEmailConfirmation(values['email'], values['email_confirmation']),
    password:              User.validatePasswordNew(values['password']),
    password_confirmation: User.validatePasswordConfirmationNew(values['password'], values['password_confirmation'])
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
