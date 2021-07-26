import { takeLatest, takeEvery } from 'redux-saga/effects';
import { sagaGeneratorFactory } from 'helpers/requestActionSupport';
import authSessionUser from 'services/authSessionUser';
import {
  logoutSuccessAction,
  logoutErrorAction,
  loginSuccessAction,
  loginErrorAction,
} from '../Login/actions';
import { LOGOUT_ACTION, USER_AUTH_VALIDATION } from '../Login/constants';
/**
 * ToDo list request/response handler
 */
const authGenerator = sagaGeneratorFactory(
  loginSuccessAction,
  loginErrorAction,
);

const logout = sagaGeneratorFactory(logoutSuccessAction, logoutErrorAction);
/**
 * Root saga manages watcher lifecycle
 */
export default function* userLoginResponse() {
  yield takeEvery(USER_AUTH_VALIDATION, authGenerator(authSessionUser));
  yield takeLatest(LOGOUT_ACTION, logout());
}
