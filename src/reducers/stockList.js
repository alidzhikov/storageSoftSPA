import {
  STOCK_PAGE_IN_LOADED,
  STOCK_PAGE_OUT_LOADED,
  STOCK_ADD,
  STOCK_EDIT,
  STOCK_REMOVE
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch(action.type){
      case STOCK_PAGE_IN_LOADED:
        return {
          ...state,
          redirectTo: '/stocks',
          stocks: action.payload.stocks,
        };
      // case STOCK_PAGE_UNLOADED:
      //   return {};
      case STOCK_PAGE_OUT_LOADED:
        return {
          ...state,
          orderedStocks: action.payload.orderedStocks,
        };
      case STOCK_ADD:
        state.stocks = state.stocks ? state.stocks : [];
        return {
          ...state,
          redirectTo: '/stocks',
          stocks: [ ...state.stocks, action.payload.stock]
        }
      case STOCK_EDIT: 
        state.stocks = state.stocks ? state.stocks : [];
        const indexToEdit = state.stocks.findIndex(stock => stock._id === action.payload.stock._id);
        return {
          ...state,
          redirectTo: '/stocks?edit=success',
          stocks: [...state.stocks.slice(0, indexToEdit), action.payload.stock, ...state.stocks.slice(indexToEdit + 1)]
        }
      case STOCK_REMOVE:
        const indexToDel = state.stocks.findIndex(stock => stock._id === action.payload.stockID);
        return {
          ...state,
          stocks: [...state.stocks.slice(0,  indexToDel), ...state.stocks.slice(indexToDel + 1)]
        }
      default:
        return state; 
    }
}