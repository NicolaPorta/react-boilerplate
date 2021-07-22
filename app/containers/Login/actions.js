import { createResponseAction } from 'helpers/requestActionSupport';
import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  USER_AUTH_VALIDATION,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
} from './constants';

export const loginSuccessAction = createResponseAction(LOGIN_SUCCESS_ACTION);
export const loginErrorAction = createResponseAction(LOGIN_ERROR_ACTION);

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
  };
}

export function successLogout() {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
}
