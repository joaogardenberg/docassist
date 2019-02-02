import React                          from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import Form                           from './FormPatient';
import * as Patient                   from '../constants/Patient';
import * as Patients                  from '../services/requests/Patients';

let NewPatient = props => {
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

  return Patients.create(params)
                 .then(({ status, data: { success, errors } }) => {
                   if (status === 200 && success) {
                     window.location.href = '/system/patients';
                   } else {
                     Object.keys(errors).forEach(key => errors[key] = errors[key][0]);
                     throw new SubmissionError(errors);
                   }
                 });
}

function validate(values) {
  const errors = {
    name:                 Patient.validateName(values['name']),
    gender:               Patient.validateGender(values['gender']),
    marital_status:       Patient.validateMaritalStatus(values['marital_status']),
    date_of_birth:        Patient.validateDateOfBirth(values['date_of_birth']),
    occupation:           Patient.validateOccupation(values['occupation']),
    cpf:                  Patient.validateCpf(values['cpf']),
    rg:                   Patient.validateRg(values['rg']),
    nationality:          Patient.validateNationality(values['nationality']),
    place_of_birth:       Patient.validatePlaceOfBirth(values['place_of_birth']),
    picture:              Patient.validateUrl(values['picture']),
    landline:             Patient.validatePhone(values['landline']),
    cell_phone:           Patient.validatePhone(values['cell_phone']),
    work_phone:           Patient.validatePhone(values['work_phone']),
    email:                Patient.validateEmail(values['email']),
    cep:                  Patient.validateCep(values['cep']),
    state:                Patient.validateState(values['state']),
    city:                 Patient.validateCity(values['city']),
    neighborhood:         Patient.validateNeighborhood(values['neighborhood']),
    address:              Patient.validateAddress(values['address']),
    complement:           Patient.validateComplement(values['complement']),
    rg_issuing_agency:    Patient.validateRgIssuingAgency(
                            values['rg'],
                            values['rg_issuing_agency']
                          ),
    nationality_other:    Patient.validateNationalityOther(
                            values['nationality'],
                            values['nationality_other']
                          ),
    place_of_birth_other: Patient.validatePlaceOfBirthOther(
                            values['place_of_birth'],
                            values['place_of_birth_other']
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

NewPatient = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'NewPatientForm'
})(NewPatient);

export default NewPatient;
