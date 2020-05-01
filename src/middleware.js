import agent from './agent';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  STOCKROOM_ADD,
  STOCKROOM_EDIT
} from './constants/actionTypes';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res);
        action.payload = res.data;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);
        action.error = true;
        action.payload = error;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (/*action.type === REGISTER ||*/ action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('user', JSON.stringify(action.payload));
      console.log(action.payload);
      agent.setToken(action.payload.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('user', '');
    agent.setToken(null);
  }

  next(action);
};

const effects = store => next => action => {
  switch (action.type) {
    case STOCKROOM_ADD:
    case STOCKROOM_EDIT:
      if (action.payload && action.payload.stockroom && action.payload.stockroom.oldDefaultStockroom) {
        store.dispatch({ type: STOCKROOM_EDIT, payload: { stockroom: action.payload.stockroom.oldDefaultStockroom } });
      }
      next(action);
      break;
    default:
      next(action);
  }
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}

export { promiseMiddleware, localStorageMiddleware, effects }