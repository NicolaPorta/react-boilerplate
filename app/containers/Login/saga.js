import { sagaGeneratorFactory } from 'helpers/requestActionSupport';
import { takeLatest } from 'redux-saga/effects';
import {
  // successUserLogin,
  // errorUserLogin,
  loginSuccessAction,
  loginErrorAction,
} from './actions';
import requestLogin from '../../services/requestLogin';
import { LOGIN_ACTION } from './constants';
/**
 * ToDo list request/response handler
 */
const loginGenerator = sagaGeneratorFactory(
  loginSuccessAction,
  loginErrorAction,
);
// export function* authUser(action) {
//   try {
//     // Call our request helper
//     const response = yield call(requestLogin, action.payload);
//     yield put(successUserLogin(response.data));
//   } catch (err) {
//     yield put(errorUserLogin(err));
//   }
// }
/**
 * Root saga manages watcher lifecycle
 */
export default function* userLoginResponse() {
  yield takeLatest(LOGIN_ACTION, loginGenerator(requestLogin));
}
