import {
  PRODUCT_PAGE_LOADED,
  PRODUCT_ADD,
  PRODUCT_EDIT,
  PRODUCT_REMOVE
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch(action.type){
      case PRODUCT_PAGE_LOADED:
        return {
          ...state,
          products: action.payload.products,
        };
      // case PRODUCT_PAGE_UNLOADED:
      //   return {};
      case PRODUCT_ADD:
        state.products = state.products ? state.products : [];
        return {
          ...state,
          redirectTo: '/products',
          products: [ ...state.products, action.payload.product]
        }
      case PRODUCT_EDIT: 
        state.products = state.products ? state.products : [];
        const indexToEdit = state.products.findIndex(product => product._id === action.payload.product._id);
        return {
          ...state,
          redirectTo: '/products?edit=success',
          products: [...state.products.slice(0, indexToEdit), action.payload.product, ...state.products.slice(indexToEdit + 1)]
        }
      case PRODUCT_REMOVE:
        const indexToDel = state.products.findIndex(product => product._id === action.payload.productID);
        return {
          ...state,
          products: [...state.products.slice(0,  indexToDel), ...state.products.slice(indexToDel + 1)]
        }
      default:
        return state; 
    }
}