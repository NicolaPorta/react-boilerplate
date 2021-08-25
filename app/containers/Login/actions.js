import { createResponseAction } from 'helpers/requestActionSupport';
import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  USER_AUTH_VALIDATION,
  LOGOUT_ACTION,
} from './constants';

export const loginSuccessAction = createResponseAction(LOGIN_SUCCESS_ACTION);
export const loginErrorAction = createResponseAction(LOGIN_ERROR_ACTION);

export function userLogin(info) {
  return {
    type: LOGIN_ACTION,
    payload: info,
    snackbar: {
      error: {
        message: 'Login error',
        severity: 'error',
        hidden: false,
      },
      success: {
        message: 'Logged in successfully',
        severity: 'success',
      },
    },
  };
}

export function authUserValidation(key) {
  return {
    type: USER_AUTH_VALIDATION,
    key,
    snackbar: {
      // error: {
      //   message: 'Token validation failed',
      //   severity: 'error',
      //   hidden: false,
      // },
      success: {
        message: 'Welcome',
        severity: 'success',
      },
    },
  };
}

export function logout(key) {
  return {
    type: LOGOUT_ACTION,
    key,
  };
}
