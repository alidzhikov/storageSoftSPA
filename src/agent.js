import axios from 'axios';

const API_ROOT = process.env.REACT_APP_API_URL;
const conentTypeJsonHeader = {'Content-Type': 'application/json'};
let authToken = null;
const headers = () => { return {headers: {...conentTypeJsonHeader, ...authToken}} };
//Authorization : Bearer cn389ncoiwuencr

const requests = {
    del: (url, headers) =>
      axios.delete(`${API_ROOT}${url}`, headers),//.then(responseBody),
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

  const Product = {
    getAll: () => 
      requests.get('products'),
    getId: (id) =>
      requests.get('products/' + id),
    update: product =>
      requests.put('products/' + product._id, JSON.stringify(product), {headers: {...conentTypeJsonHeader, ...authToken}}),
    create: product =>
      requests.post('products', JSON.stringify(product), {headers: {...conentTypeJsonHeader, ...authToken}}),
    delete: id => 
      requests.del('products/' + id, headers()),
  };

  export default {
    Product,
    Auth,
    //Comments,
    //Profile,
    //Tags,
    setToken: _token => { authToken =  {'Authorization': 'Bearer ' + _token} }
  };
  