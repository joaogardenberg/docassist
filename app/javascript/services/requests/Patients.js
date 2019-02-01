import Axios from 'axios';

export function create(params) {
  return Axios.post('/system/patients', params);
}

export function update(params, id) {
  return Axios.put(`/system/patients/${id}`, params);
}
