import Axios from 'axios';

export function cepSearch(cep) {
  return Axios.get(`https://viacep.com.br/ws/${cep}/json`);
}
