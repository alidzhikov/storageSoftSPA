import {
  STOCK_PAGE_IN_LOADED,
  STOCK_PAGE_OUT_LOADED,
  STOCK_ADD,
  STOCK_EDIT,
  STOCK_REMOVE,
  STOCKROOM_PAGE_LOADED,
  STOCKROOM_ADD,
  STOCKROOM_EDIT,
  STOCKROOM_REMOVE
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
      case STOCKROOM_PAGE_LOADED:
        return {
          ...state,
          redirectTo: '/stocks',
          stockrooms: action.payload.stockrooms,
        };
      // case STOCKROOM_PAGE_UNLOADED:
      //   return {};
      case STOCKROOM_ADD:
        state.stockrooms = state.stockrooms ? state.stockrooms : [];
        const stockroomToAdd = action.payload.stockroom && action.payload.stockroom.stockroom ? action.payload.stockroom.stockroom : action.payload.stockroom;
        return {
          ...state,
          redirectTo: '/stocks',
          stockrooms: [ ...state.stockrooms, stockroomToAdd]
        }
      case STOCKROOM_EDIT: 
        state.stockrooms = state.stockrooms ? state.stockrooms : [];
        const stockroomIndexToEdit = state.stockrooms.findIndex(stockroom => stockroom._id === action.payload.stockroom._id);
        const stockroomToUpdate = action.payload.stockroom && action.payload.stockroom.stockroom ? action.payload.stockroom.stockroom : action.payload.stockroom;
        return {
          ...state,
          redirectTo: '/stocks?edit=success',
          stockrooms: [...state.stockrooms.slice(0, stockroomIndexToEdit), stockroomToUpdate, ...state.stockrooms.slice(stockroomIndexToEdit + 1)]
        }
      case STOCKROOM_REMOVE:
        const stockroomIndexToDel = state.stockrooms.findIndex(stockroom => stockroom._id === action.payload.stockroomID);
        return {
          ...state,
          stockrooms: [...state.stockrooms.slice(0,  stockroomIndexToDel), ...state.stockrooms.slice(stockroomIndexToDel + 1)]
        }
      default:
        return state; 
    }
}