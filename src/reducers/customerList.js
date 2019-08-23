import {
  CUSTOMER_PAGE_LOADED,
  CUSTOMER_ADD,
  CUSTOMER_EDIT,
  CUSTOMER_REMOVE
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch(action.type){
      case CUSTOMER_PAGE_LOADED:
        return {
          ...state,
          customers: action.payload.customers,
        };
      // case CUSTOMER_PAGE_UNLOADED:
      //   return {};
      case CUSTOMER_ADD:
        state.customers = state.customers ? state.customers : [];
        return {
          ...state,
          redirectTo: '/customers',
          customers: [ ...state.customers, action.payload.customer]
        }
      case CUSTOMER_EDIT: 
        state.customers = state.customers ? state.customers : [];
        const indexToEdit = state.customers.findIndex(customer => customer._id === action.payload.customer._id);
        return {
          ...state,
          redirectTo: '/customers?edit=success',
          customers: [...state.customers.slice(0, indexToEdit), action.payload.customer, ...state.customers.slice(indexToEdit + 1)]
        }
      case CUSTOMER_REMOVE:
        const indexToDel = state.customers.findIndex(customer => customer._id === action.payload.customerID);
        return {
          ...state,
          customers: [...state.customers.slice(0,  indexToDel), ...state.customers.slice(indexToDel + 1)]
        }
      default:
        return state; 
    }
}