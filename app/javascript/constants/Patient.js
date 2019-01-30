import * as Regex from './Regex';

export const GENDERS = [
  I18n.t('patients.genders.male'),
  I18n.t('patients.genders.female')
];

export const GENDER_VALUES = [
  '0',
  '1'
];

export const MARITAL_STATUSES = [
  I18n.t('patients.marital_statuses.single'),
  I18n.t('patients.marital_statuses.married'),
  I18n.t('patients.marital_statuses.divorced'),
  I18n.t('patients.marital_statuses.widow')
];

export const MARITAL_STATUS_VALUES = [
  '0',
  '1',
  '2',
  '3'
];

export const NATIONALITIES = [
  I18n.t('patients.nationalities.brazilian'),
  I18n.t('patients.nationalities.other')
];

export const NATIONALITY_VALUES = [
  '0',
  '1'
]

export const STATES = [
  'Acre',
  'Alagoas',
  'Amapá',
  'Amazonas',
  'Bahia',
  'Ceará',
  'Distrito Federal',
  'Espírito Santo',
  'Goiás',
  'Maranhão',
  'Mato Grosso',
  'Mato Grosso do Sul',
  'Minas Gerais',
  'Pará',
  'Paraíba',
  'Paraná',
  'Pernambuco',
  'Piauí',
  'Rio de Janeiro',
  'Rio Grande do Norte',
  'Rio Grande do Sul',
  'Rondônia',
  'Roraima',
  'Santa Catarina',
  'São Paulo',
  'Sergipe',
  'Tocantins',
  I18n.t('patients.places_of_birth.other')
];

export const STATE_VALUES = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27'
];

export const STATE_INITIALS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO'
];

export function getGenderName(gender) {
  const index = GENDER_VALUES.findIndex(g => g === gender);

  if (index >= 0) {
    return GENDERS[index];
  }

  return null;
}

export function getMaritalStatusName(maritalStatus) {
  const index = MARITAL_STATUS_VALUES.findIndex(mS => mS === maritalStatus);

  if (index >= 0) {
    return MARITAL_STATUSES[index];
  }

  return null;
}

export function getStateValueFromInitials(initials) {
  const index = STATE_INITIALS.findIndex(sI => sI === initials);

  if (index >= 0) {
    return STATE_VALUES[index];
  }

  return null;
}

export function getRgWithIssuingAgency(rg, rgIssuingAgency) {
  if (rg) {
    return `${rg} - ${rgIssuingAgency}`
  }

  return null;
}

export function getNationalityName(nationality, nationalityOther) {
  if (nationality === NATIONALITY_VALUES[NATIONALITY_VALUES.length - 1]) {
    return nationalityOther;
  } else {
    const index = NATIONALITY_VALUES.findIndex(n => n === nationality);

    if (index >= 0) {
      return NATIONALITIES[index];
    }

    return null;
  }
}

export function getPlaceOfBirthName(placeOfBirth, placeOfBirthOther) {
  if (placeOfBirth === STATE_VALUES[STATE_VALUES.length - 1]) {
    return placeOfBirthOther;
  } else {
    const index = STATE_VALUES.findIndex(state => state === placeOfBirth);

    if (index >= 0) {
      return STATES[index];
    }

    return null;
  }
}

export function getFullAddress(cep, state, city, neighborhood, address, complement) {
  let fullAddress = '';

  if (address) {
    fullAddress += address;
  }

  if (complement && address) {
    fullAddress += `, ${complement}`;
  }

  if (neighborhood) {
    let prefix = '';

    if (fullAddress) {
      prefix = ' - ';
    }

    fullAddress += `${prefix}${neighborhood}`;
  }

  if (city) {
    let prefix = '';

    if (fullAddress) {
      prefix = ' - ';
    }

    fullAddress += `${prefix}${city}`;
  }

  if (state) {
    let prefix = '';

    if (fullAddress) {
      if (city) {
        prefix = ' / ';
      } else {
        prefix = ' - ';
      }
    }

    fullAddress += `${prefix}${state}`;
  }

  if (cep) {
    let prefix = '';

    if (fullAddress) {
      prefix = ' - ';
    }

    fullAddress += `${prefix}CEP ${cep}`;
  }

  return fullAddress;
}

export function validateName(name) {
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

export function validateGender(gender) {
  if (!GENDER_VALUES.includes(gender)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

export function validateMaritalStatus(maritalStatus) {
  if (!MARITAL_STATUS_VALUES.includes(maritalStatus)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

export function validateDateOfBirth(dateOfBirth) {
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

export function validateOccupation(occupation) {
  if (occupation && occupation.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

export function validateCpf(cpf) {
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

export function validateRg(rg) {
  if (rg && rg.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

export function validateRgIssuingAgency(rg, rgIssuingAgency) {
  if (rg && !rgIssuingAgency) {
    return 'Campo obrigatório';
  }

  if (rg && rgIssuingAgency && rgIssuingAgency.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

export function validateNationality(nationality) {
  if (!NATIONALITY_VALUES.includes(nationality)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

export function validateNationalityOther(nationality, nationalityOther) {
  if (nationality === NATIONALITY_VALUES[NATIONALITY_VALUES.length - 1] && !nationalityOther) {
    return 'Campo obrigatório';
  }

  if (nationality === NATIONALITY_VALUES[NATIONALITY_VALUES.length - 1] && nationalityOther && nationalityOther.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

export function validatePlaceOfBirth(placeOfBirth) {
  if (!STATE_VALUES.includes(placeOfBirth)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

export function validatePlaceOfBirthOther(placeOfBirth, placeOfBirthOther) {
  if (placeOfBirth === STATE_VALUES[STATE_VALUES.length - 1] && !placeOfBirthOther) {
    return 'Campo obrigatório';
  }

  if (placeOfBirth === STATE_VALUES[STATE_VALUES.length - 1] && placeOfBirthOther && placeOfBirthOther.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

export function validatePhone(phone) {
  if (phone && !phone.match(Regex.Phone)) {
    return 'Número inválido';
  }

  return null;
}

export function validateEmail(email) {
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

export function validateCep(cep) {
  if (cep && !cep.match(Regex.CEP)) {
    return 'CEP inválido';
  }

  return null;
}

export function validateState(state) {
  if (!STATE_VALUES.includes(state)) {
    return 'Opção inválida. Recarregue a página';
  }

  return null;
}

export function validateCity(city) {
  if (city && city.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

export function validateNeighborhood(neighborhood) {
  if (neighborhood && neighborhood.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

export function validateAddress(address) {
  if (address && address.length > 100) {
    return 'Máximo 100 caracteres';
  }

  return null;
}

export function validateComplement(complement) {
  if (complement && complement.length > 100) {
    return 'Máximo 100 caracteres';
  }

  return null;
}
