export const GENDERS = [
  'Masculino',
  'Feminino'
];

export const GENDER_VALUES = [
  '0',
  '1'
];

export const MARITAL_STATUSES = [
  'Solteiro(a)',
  'Casado(a)',
  'Divorciado(a)',
  'Viúvo(a)'
];

export const MARITAL_STATUS_VALUES = [
  '0',
  '1',
  '2',
  '3'
];

export const NATIONALITIES = [
  'Brasileira',
  'Outra'
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
  'Outra'
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
