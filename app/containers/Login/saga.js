import { sagaGeneratorFactory } from 'helpers/requestActionSupport';
import { takeLatest } from 'redux-saga/effects';
import { loginSuccessAction, loginErrorAction } from './actions';
import requestLogin from '../../services/requestLogin';
import { LOGIN_ACTION } from './constants';
/**
 * ToDo list request/response handler
 */
const loginGenerator = sagaGeneratorFactory(
  loginSuccessAction,
  loginErrorAction,
);
/**
 * Root saga manages watcher lifecycle
 */
export default function* userLoginResponse() {
  yield takeLatest(LOGIN_ACTION, loginGenerator(requestLogin));
}
