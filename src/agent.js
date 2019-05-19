import axios from 'axios';

const headers = { headers: {authToken, conentTypeJsonHeader }};
const conentTypeJsonHeader = {'Content-Type': 'application/json'};
const authToken = {'Authorization': 'Bearer ' + token};
let token = null;
const API_ROOT = process.env.REACT_APP_API_URL;
//Authorization : Bearer cn389ncoiwuencr
const requests = {
    del: (url, headers) =>
      axios.del(`${API_ROOT}${url}`, headers),//.then(responseBody),
    get: (url, headers) =>
      axios.get(`${API_ROOT}${url}`, headers),//.then(responseBody),
    put: (url, body, headers) =>
      axios.put(`${API_ROOT}${url}`, body, headers),//.then(responseBody),
    post: (url, body, headers) =>
      axios.post(`${API_ROOT}${url}`, body, headers)//.then(responseBody)
  };

  const Auth = {
    current: () =>
      requests.get('auth'),
    login: (email, password) =>
      requests.post('auth/login', JSON.stringify({ email, password }), {headers: conentTypeJsonHeader}),
    register: (userDetails) =>
      requests.put('auth/signup', JSON.stringify(userDetails),  {headers: conentTypeJsonHeader}),
    save: user =>
      requests.put('auth', { user })
  };

  export default {
    //Articles,
    Auth,
    //Comments,
    //Profile,
    //Tags,
    setToken: _token => { token = _token; }
  };
  