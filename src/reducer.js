import auth from './reducers/auth';
import product from './reducers/productList';
import customer from './reducers/customerList';
import order from './reducers/orderList';
import common from './reducers/common';
import { combineReducers } from 'redux';


export default combineReducers({
  auth,
  product,
  customer,
  order,
  common,
});
