import {
    ORDER_PAGE_LOADED,
    ORDER_PAGE_UNLOADED,
    ORDER_ADD,
    ORDER_EDIT,
    ORDER_REMOVE
  } from '../constants/actionTypes';
  
  export default (state = {}, action) => {
      switch(action.type){
        case ORDER_PAGE_LOADED:
          return {
            ...state,
            orders: action.payload.orders,
          };
        case ORDER_PAGE_UNLOADED:
          return {};
        case ORDER_ADD:
          state.orders = state.orders ? state.orders : [];
          return {
            ...state,
            redirectTo: '/orders',
            orders: [ ...state.orders, action.payload.order]
          }
        case ORDER_EDIT: 
          state.orders = state.orders ? state.orders : [];
          const indexToEdit = state.orders.findIndex(order => order._id === action.payload.order._id);
          return {
            ...state,
            redirectTo: '/orders?edit=success',
            orders: [...state.orders.slice(0, indexToEdit), action.payload.order, ...state.orders.slice(indexToEdit + 1)]
          }
        case ORDER_REMOVE:
          const indexToDel = state.orders.findIndex(order => order._id === action.payload.orderID);
          return {
            ...state,
            orders: [...state.orders.slice(0,  indexToDel), ...state.orders.slice(indexToDel + 1)]
          }
        default:
          return state; 
      }
  }