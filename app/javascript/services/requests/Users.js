import Axios from 'axios';

export function create(params) {
  return Axios.post('/system/users', params);
}

export function update(params, id) {
  return Axios.put(`/system/users/${id}`, params);
}
