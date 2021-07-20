import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import authSessionUser from 'services/authSessionUser';
import {
  errorUserLogin,
  successLogout,
  successUserLogin,
} from '../Login/actions';
import { USER_AUTH_VALIDATION, USER_LOGOUT } from '../Login/constants';
/**
 * ToDo list request/response handler
 */

export function* validateUser() {
  try {
    // Call our request helper
    const response = yield call(authSessionUser);
    yield put(successUserLogin(response.data));
  } catch (err) {
    yield put(errorUserLogin(err));
  }
}

export function* logout() {
  try {
    // Call our request helper
    yield put(successLogout());
  } catch (err) {
    yield put(errorUserLogin(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* userLoginResponse() {
  yield takeEvery(USER_AUTH_VALIDATION, validateUser);
  yield takeLatest(USER_LOGOUT, logout);
}
