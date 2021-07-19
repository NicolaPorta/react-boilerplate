import { call, put, takeLatest } from 'redux-saga/effects';
import authSessionUser from 'services/authSessionUser';
import { successUserLogin, errorUserLogin } from './actions';
import requestLogin from '../../services/requestLogin';
import { LOGIN_ACTION, USER_AUTH_VALIDATION, USER_LOGOUT } from './constants';
/**
 * ToDo list request/response handler
 */
export function* authUser(action) {
  try {
    // Call our request helper
    const response = yield call(requestLogin, action.payload);
    yield put(successUserLogin(response.data));
  } catch (err) {
    yield put(errorUserLogin(err));
  }
}

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
    yield put(successUserLogin({}));
  } catch (err) {
    yield put(errorUserLogin(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* userLoginResponse() {
  yield takeLatest(USER_AUTH_VALIDATION, validateUser);
  yield takeLatest(LOGIN_ACTION, authUser);
  yield takeLatest(USER_LOGOUT, logout);
}
