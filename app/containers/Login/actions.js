import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  USER_AUTH_VALIDATION,
  USER_LOGOUT,
} from './constants';

export function userLogin(info) {
  return {
    type: LOGIN_ACTION,
    payload: info,
  };
}

export function successUserLogin(info) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    payload: info,
  };
}

export function errorUserLogin(info) {
  return {
    type: LOGIN_ERROR_ACTION,
    payload: info,
  };
}

export function authUserValidation() {
  return {
    type: USER_AUTH_VALIDATION,
  };
}

export function logout() {
  return {
    type: USER_LOGOUT,
    payload: {
      logout: true,
    },
  };
}
