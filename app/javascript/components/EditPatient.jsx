import React         from 'react';
import { reduxForm } from 'redux-form';
import Form          from './FormPatient';
import * as Regex    from '../constants/Regex';
import * as Patient  from '../constants/Patient';

let EditPatient = props => {
  const { change, untouch, reset, authenticityToken, initialValues } = props;
  const { handleSubmit }                                             = props;

  return (
    <div className="form">
      <Form
        method="put"
        action={ `/system/patients/${initialValues.id}` }
        change={ change }
        untouch={ untouch }
        restoreCallback={ reset }
        handleSubmit={ handleSubmit }
        authenticityToken={ authenticityToken }
      />
    </div>
  );
}

function validateName(name) {
  if (!name) {
    return 'Campo obrigatório';
  }

  if (name.length > 100) {
    return 'Máximo 100 caracteres';
  }

  if (!name.toLowerCase().match(Regex.LowercaseName)) {
    return 'Não pode conter caracteres especiais';
  }

  return null;
}

function validateGender(gender) {
  if (!Patient.GENDER_VALUES.includes(gender)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

function validateMaritalStatus(maritalStatus) {
  if (!Patient.MARITAL_STATUS_VALUES.includes(maritalStatus)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

function validateDateOfBirth(dateOfBirth) {
  if (!dateOfBirth) {
    return 'Campo obrigatório';
  }

  if (!dateOfBirth.match(Regex.DateOfBirth)) {
    return 'Data de nascimento inválida';
  }

  const [ day, month, year ] = dateOfBirth.split('/');

  const date = Date.parse(`${month}/${day}/${year}`);

  if (!date || date > new Date()) {
    return 'Data de nascimento inválida';
  }

  return null;
}

function validateOccupation(occupation) {
  if (occupation && occupation.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateCpf(cpf) {
  if (cpf) {
    if (!cpf.match(Regex.CPF)) {
      return 'CPF inválido';
    }

    cpf = cpf.replace(/\./g, '').replace(/-/g, '');

    let error = false;

    let firstDigit = cpf.substr(0, cpf.length - 2).split('').reduce((acc, curr, i) => {
      acc += parseInt(curr) * (10 - i);
      return acc;
    }, 0) * 10 % 11;

    if (firstDigit === 10) {
      firstDigit = 0;
    }

    if (firstDigit !== parseInt(cpf[9])) {
      error = true;
    }

    if (!error) {
      let secondDigit = cpf.substr(0, cpf.length - 1).split('').reduce((acc, curr, i) => {
        acc += parseInt(curr) * (11 - i)
        return acc;
      }, 0) * 10 % 11;

      if (secondDigit === 10) {
        secondDigit = 0;
      }

      if (secondDigit !== parseInt(cpf[10])) {
        error = true;
      }
    }

    if (error) {
      return 'CPF inválido';
    }
  }

  return null;
}

function validateRg(rg) {
  if (rg && rg.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateRgIssuingAgency(rg, rgIssuingAgency) {
  if (rg && !rgIssuingAgency) {
    return 'Campo obrigatório';
  }

  if (rg && rgIssuingAgency && rgIssuingAgency.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateNationality(nationality) {
  if (!Patient.NATIONALITY_VALUES.includes(nationality)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

function validateNationalityOther(nationality, nationalityOther) {
  if (nationality === Patient.NATIONALITY_VALUES[Patient.NATIONALITY_VALUES.length - 1] && !nationalityOther) {
    return 'Campo obrigatório';
  }

  if (nationality === Patient.NATIONALITY_VALUES[Patient.NATIONALITY_VALUES.length - 1] && nationalityOther && nationalityOther.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validatePlaceOfBirth(placeOfBirth) {
  if (!Patient.STATE_VALUES.includes(placeOfBirth)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

function validatePlaceOfBirthOther(placeOfBirth, placeOfBirthOther) {
  if (placeOfBirth === Patient.STATE_VALUES[Patient.STATE_VALUES.length - 1] && !placeOfBirthOther) {
    return 'Campo obrigatório';
  }

  if (placeOfBirth === Patient.STATE_VALUES[Patient.STATE_VALUES.length - 1] && placeOfBirthOther && placeOfBirthOther.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validatePhone(phone) {
  if (phone && !phone.match(Regex.Phone)) {
    return 'Número inválido'
  }

  return null;
}

function validateEmail(email) {
  if (email) {
    if (email.length > 50) {
      return 'Máximo 50 caracteres';
    }

    if (!email.toLowerCase().match(Regex.Email)) {
      return 'E-mail inválido';
    }
  }

  return null;
}

function validateCep(cep) {
  if (cep && !cep.match(Regex.CEP)) {
    return 'CEP inválido';
  }

  return null;
}

function validateState(state) {
  if (!Patient.STATE_VALUES.includes(state)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

function validateCity(city) {
  if (city && city.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateNeighborhood(neighborhood) {
  if (neighborhood && neighborhood.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateAddress(address) {
  if (address && address.length > 100) {
    return 'Máximo 100 caracteres';
  }

  return null;
}

function validateComplement(complement) {
  if (complement && complement.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validate(values) {
  const errors = {
    name:                 validateName(values['name']),
    gender:               validateGender(values['gender']),
    marital_status:       validateMaritalStatus(values['marital_status']),
    date_of_birth:        validateDateOfBirth(values['date_of_birth']),
    occupation:           validateOccupation(values['occupation']),
    cpf:                  validateCpf(values['cpf']),
    rg:                   validateRg(values['rg']),
    rg_issuing_agency:    validateRgIssuingAgency(values['rg'], values['rg_issuing_agency']),
    nationality:          validateNationality(values['nationality']),
    nationality_other:    validateNationalityOther(values['nationality'], values['nationality_other']),
    place_of_birth:       validatePlaceOfBirth(values['place_of_birth']),
    place_of_birth_other: validatePlaceOfBirthOther(values['place_of_birth'], values['place_of_birth_other']),
    landline:             validatePhone(values['landline']),
    cell_phone:           validatePhone(values['cell_phone']),
    work_phone:           validatePhone(values['work_phone']),
    email:                validateEmail(values['email']),
    cep:                  validateCep(values['cep']),
    state:                validateState(values['state']),
    city:                 validateCity(values['city']),
    neighborhood:         validateNeighborhood(values['neighborhood']),
    address:              validateAddress(values['address']),
    complement:           validateComplement(values['complement'])
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

EditPatient = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'EditPatientForm'
})(EditPatient);

export default EditPatient;
