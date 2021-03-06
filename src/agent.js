import axios from 'axios';
import ProductCtr from './models/product';
import CustomerCtr from './models/customer';
import StockCtr from './models/stock';
import StockroomCtr from './models/stockroom';
import OrderCtr from './models/order';

const API_ROOT = process.env.REACT_APP_API_URL;
const conentTypeJsonHeader = { 'Content-Type': 'application/json' };
let authToken = null;
const headers = () => { return { headers: { ...conentTypeJsonHeader, ...authToken } } };
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
    requests.post('auth/login', JSON.stringify({ email, password }), { headers: conentTypeJsonHeader }),
  register: (userDetails) =>
    requests.put('auth/signup', JSON.stringify(userDetails), { headers: conentTypeJsonHeader }),
  save: user =>
    requests.put('auth', { user })
};

const Product = {
  getAll: () =>
    requests.get('products').then(res => {
      if (res && res.data)
        res.data.products = res.data.products.map(el => new ProductCtr(el));
      return res;
    }),
  getId: (id) =>
    requests.get('products/' + id),
  update: product =>
    requests.put('products/' + product._id, JSON.stringify(product), headers()),
  create: product =>
    requests.post('products', JSON.stringify(product), headers()),
  delete: id =>
    requests.del('products/' + id, headers()),
};

const Customer = {
  getAll: () =>
    requests.get('customers').then(res => {
      if (res && res.data)
        res.data.customers = res.data.customers.map(el => new CustomerCtr(el));
      return res;
    }),
  getId: (id) =>
    requests.get('customers/' + id),
  update: customer =>
    requests.put('customers/' + customer._id, JSON.stringify(customer), headers()),
  create: customer =>
    requests.post('customers', JSON.stringify(customer), headers()),
  delete: id =>
    requests.del('customers/' + id, headers()),
};

const Order = {
  getAll: () =>
    requests.get('orders').then(res => {
      if (res && res.data)
        res.data.orders = res.data.orders.map(el => new OrderCtr(el)).reverse();
      return res;
    }),
  getId: (id) =>
    requests.get('orders/' + id),
  update: order =>
    requests.put('orders/' + order._id, JSON.stringify(order), headers()),
  create: order =>
    requests.post('orders', JSON.stringify(order), headers()),
  delete: id =>
    requests.del('orders/' + id, headers()),
};

const Stock = {
  getAll: () =>
    requests.get('stocks').then(res => {
      console.log(res)
      if (res && res.data)
        res.data.stocks = res.data.stocks.map(el => new StockCtr(el));
      return res;
    }),
  getProductsOrdered: () =>
    requests.get('stocks/productsOrdered').then(res => {
      if (res && res.data)
        res.data.orderedStocks = res.data.orderedStocks.map(el => new StockCtr(el));
      return res;
    }),
  getId: (id) =>
    requests.get('stocks/' + id),
  update: stock =>
    requests.put('stocks/' + stock._id, JSON.stringify(stock), headers()),
  create: stock =>
    requests.post('stocks', JSON.stringify(stock), headers()),
  delete: id =>
    requests.del('stocks/' + id, headers()),
};

const Stockroom = {
  getAll: () =>
    requests.get('stockrooms').then(res => {
      if (res && res.data)
        res.data.stockrooms = res.data.stockrooms.map(el => new StockroomCtr(el));
      return res;
    }),
  getId: (id) =>
    requests.get('stockrooms/' + id),
  update: stockroom =>
    requests.put('stockrooms/' + stockroom._id, JSON.stringify(stockroom), headers()),
  create: stockroom =>
    requests.post('stockrooms', JSON.stringify(stockroom), headers()),
  delete: id =>
    requests.del('stockrooms/' + id, headers()),
};

export default {
  Product,
  Auth,
  Customer,
  Order,
  Stock,
  Stockroom,
  setToken: _token => { authToken = { 'Authorization': 'Bearer ' + _token } }
};
