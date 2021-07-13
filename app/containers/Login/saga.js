import { call, put, takeLatest } from 'redux-saga/effects';
import { successUserLogin, errorUserLogin } from './actions';
import requestLogin from '../../services/requestLogin';
import { LOGIN_ACTION } from './constants';
/**
 * ToDo list request/response handler
 */
export function* authUser(action) {
  try {
    const { email, password } = action.payload;
    // Call our request helper (see 'services/getToDoList')
    const user = yield call(requestLogin, email, password);
    yield put(successUserLogin(user.data));
  } catch (err) {
    yield put(errorUserLogin(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userLoginResponse() {
  yield takeLatest(LOGIN_ACTION, authUser);
}
