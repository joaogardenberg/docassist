import React         from 'react';
import { reduxForm } from 'redux-form';
import Form          from './FormPatient';
import * as Patient  from '../constants/Patient';

let NewPatient = props => {
  const { change, untouch, reset, authenticityToken, handleSubmit } = props;
  const { doctors }                                                 = props;

  return (
    <div className="form">
      <Form
        doctors={ doctors }
        action="/system/patients"
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
    name:                 Patient.validateName(values['name']),
    gender:               Patient.validateGender(values['gender']),
    marital_status:       Patient.validateMaritalStatus(values['marital_status']),
    date_of_birth:        Patient.validateDateOfBirth(values['date_of_birth']),
    occupation:           Patient.validateOccupation(values['occupation']),
    cpf:                  Patient.validateCpf(values['cpf']),
    rg:                   Patient.validateRg(values['rg']),
    rg_issuing_agency:    Patient.validateRgIssuingAgency(values['rg'], values['rg_issuing_agency']),
    nationality:          Patient.validateNationality(values['nationality']),
    nationality_other:    Patient.validateNationalityOther(values['nationality'], values['nationality_other']),
    place_of_birth:       Patient.validatePlaceOfBirth(values['place_of_birth']),
    place_of_birth_other: Patient.validatePlaceOfBirthOther(values['place_of_birth'], values['place_of_birth_other']),
    landline:             Patient.validatePhone(values['landline']),
    cell_phone:           Patient.validatePhone(values['cell_phone']),
    work_phone:           Patient.validatePhone(values['work_phone']),
    email:                Patient.validateEmail(values['email']),
    cep:                  Patient.validateCep(values['cep']),
    state:                Patient.validateState(values['state']),
    city:                 Patient.validateCity(values['city']),
    neighborhood:         Patient.validateNeighborhood(values['neighborhood']),
    address:              Patient.validateAddress(values['address']),
    complement:           Patient.validateComplement(values['complement'])
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
  initialValues: {
    gender: '0',
    marital_status: '0',
    nationality: '0',
    place_of_birth: '18',
    state: '18'
  },
  enableReinitialize: true,
  form: 'NewPatientForm'
})(NewPatient);

export default NewPatient;
