import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
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
