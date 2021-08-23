import { takeEvery } from 'redux-saga/effects';
import { sagaGeneratorFactory } from 'helpers/requestActionSupport';
import authSessionUser from 'services/authSessionUser';
import { loginSuccessAction, loginErrorAction } from '../Login/actions';
import { USER_AUTH_VALIDATION } from '../Login/constants';
/**
 * Login request/response handler
 */
const authGenerator = sagaGeneratorFactory(
  loginSuccessAction,
  loginErrorAction,
);
/**
 * Root saga manages watcher lifecycle
 */
export default function* userLoginResponse() {
  yield takeEvery(USER_AUTH_VALIDATION, authGenerator(authSessionUser));
}
