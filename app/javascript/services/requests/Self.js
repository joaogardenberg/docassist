import Axios from 'axios';

export function update(params, id) {
  return Axios.put('/system/user/update', params);
}
