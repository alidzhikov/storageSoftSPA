import auth from './reducers/auth';
import product from './reducers/productList';
import common from './reducers/common';
import { combineReducers } from 'redux';


export default combineReducers({
  auth,
  product,
  common,
});
