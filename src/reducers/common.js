import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    ORDER_SUBMITTED,
    SETTINGS_SAVED,
    LOGIN,
    REGISTER,
    DELETE_ORDER,
    ORDER_PAGE_UNLOADED,
    EDITOR_PAGE_UNLOADED,
    HOME_PAGE_UNLOADED,
    PROFILE_PAGE_UNLOADED,
    SETTINGS_PAGE_UNLOADED,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
    PRODUCT_ADD,
    PRODUCT_EDIT,
  } from '../constants/actionTypes';
  
  const defaultState = {
    appName: 'MO11',
    token: null,
    viewChangeCounter: 0
  };
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case APP_LOAD:
        return {
          ...state,
          token: action.token || null,
          appLoaded: true,
          currentUser: action.payload ? action.payload : null
        };
      case REDIRECT:
        return { ...state, redirectTo: null };
      case LOGOUT:
        return { ...state, redirectTo: '/', token: null, currentUser: null };
      case ORDER_SUBMITTED:
        const redirectUrl = `order/${action.payload.order.slug}`;
        return { ...state, redirectTo: redirectUrl };
      case SETTINGS_SAVED:
        return {
          ...state,
          redirectTo: action.error ? null : '/',
          currentUser: action.error ? null : action.payload.user
        };
      case LOGIN:
        return {
          ...state,
          redirectTo: action.error ? null : '/',
          token: action.error ? null : action.payload.token,
          currentUser: action.error ? null : action.payload.currentUser
        };
      case REGISTER:
        return {
          ...state,
          redirectTo: action.error ? null : '/login',
          //token: action.error ? null : action.payload.user.token,
          //currentUser: action.error ? null : action.payload.user
        };
      case DELETE_ORDER:
        return { ...state, redirectTo: '/' };
      case ORDER_PAGE_UNLOADED:
      case EDITOR_PAGE_UNLOADED:
      case HOME_PAGE_UNLOADED:
      case PROFILE_PAGE_UNLOADED:
      case SETTINGS_PAGE_UNLOADED:
      case LOGIN_PAGE_UNLOADED:
      case REGISTER_PAGE_UNLOADED:
        return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
      case PRODUCT_ADD:
        return { ...state, redirectTo: action.error ? null : '/products'}
      case PRODUCT_EDIT:
        return { ...state, redirectTo: action.error ? null : '/products'}
      default:
        return state;
    }
  };
  