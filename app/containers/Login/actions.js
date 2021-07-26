import { createResponseAction } from 'helpers/requestActionSupport';
import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  USER_AUTH_VALIDATION,
  LOGOUT_ACTION,
  LOGOUT_SUCCESS_ACTION,
  LOGOUT_ERROR_ACTION,
} from './constants';

export const loginSuccessAction = createResponseAction(LOGIN_SUCCESS_ACTION);
export const loginErrorAction = createResponseAction(LOGIN_ERROR_ACTION);
export const logoutSuccessAction = createResponseAction(LOGOUT_SUCCESS_ACTION);
export const logoutErrorAction = createResponseAction(LOGOUT_ERROR_ACTION);

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

export function authUserValidation(key) {
  return {
    type: USER_AUTH_VALIDATION,
    key,
  };
}

export function logout(key) {
  return {
    type: LOGOUT_ACTION,
    key,
  };
}
