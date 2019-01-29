import React, { Component } from 'react';
import { Provider }         from 'react-redux';
import { createStore }      from 'redux';
import Reducers             from '../reducers';
import NewPatient           from './NewPatient';
import EditPatient          from './EditPatient';
import NewUser              from './NewUser';
import EditUser             from './EditUser';
import EditSelf             from './EditSelf';
import Default              from './Default';

const Redux = props => {
  let RenderComponent;

  switch(props.component) {
    case 'NewPatient':
      RenderComponent = NewPatient;
      break;
    case 'EditPatient':
      RenderComponent = EditPatient;
      break;
    case 'NewUser':
      RenderComponent = NewUser;
      break;
    case 'EditUser':
      RenderComponent = EditUser;
      break;
    case 'EditSelf':
      RenderComponent = EditSelf;
      break;
    default:
      RenderComponent = Default;
  }

  const doctors = sanitizeArray(props.doctors);
  const initialValues = sanitize(props.attributes, props.component, doctors);

  return (
    <Provider store={ createStore(Reducers) }>
      <RenderComponent
        authenticityToken={ props.authenticityToken }
        initialValues={ initialValues }
        doctors={ doctors }
      />
    </Provider>
  );
}

const sanitize = (attributes, component, doctors) => {
  if (!attributes) {
    let initialValues;

    switch(component) {
      case 'NewPatient':
        initialValues = {
          gender: '0',
          marital_status: '0',
          nationality: '0',
          place_of_birth: '18',
          state: '18'
        }

        if (doctors && doctors.length > 0) {
          initialValues.user_id = doctors[0].id;
        }

        break;
      case 'NewUser':
        initialValues = {
          type: '0'
        }
        break;
      default:
        initialValues = undefined;
    }

    return initialValues;
  }

  const sanitized = attributes;

  sanitized.id = sanitized._id.$oid;

  if (sanitized.gender !== null && sanitized.gender !== undefined) {
    sanitized.gender = `${sanitized.gender}`;
  }

  if (sanitized.marital_status !== null && sanitized.marital_status !== undefined) {
    sanitized.marital_status = `${sanitized.marital_status}`;
  }

  if (sanitized.nationality !== null && sanitized.nationality !== undefined) {
    sanitized.nationality = `${sanitized.nationality}`;
  }

  if (sanitized.place_of_birth !== null && sanitized.place_of_birth !== undefined) {
    sanitized.place_of_birth = `${sanitized.place_of_birth}`;
  }

  if (sanitized.state !== null && sanitized.state !== undefined) {
    sanitized.state = `${sanitized.state}`;
  }

  if (sanitized.email) {
    sanitized.email_confirmation = sanitized.email;
  }

  if (sanitized.type !== null && sanitized.type !== undefined) {
    sanitized.type = `${sanitized.type}`;
  }

  if (sanitized.type_of && sanitized.type_of.length > 0) {
    sanitized.type_of = sanitized.type_of.map(object => object.$oid);
  }

  if (sanitized.date_of_birth) {
    const [ year, month, day ] = sanitized.date_of_birth.split('-');
    sanitized.date_of_birth  = `${day}/${month}/${year}`;
  }

  return sanitized;
}

const sanitizeArray = array => {
  if (!array) {
    return undefined;
  }

  return array.map(place => sanitize(place));
}

export default Redux;
