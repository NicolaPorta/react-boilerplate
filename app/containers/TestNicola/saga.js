/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { changeToDo } from 'actions';

import request from 'utils/request';
import { makeSelectId } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getToDo() {
  // Select username from store
  const id = yield select(makeSelectId());
  const requestURL = `https://jsonplaceholder.typicode.com/todos/${id}`;

  try {
    // Call our request helper (see 'utils/request')
    const toDos = yield call(request, requestURL);
    yield put(changeToDo(toDos));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getToDoData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest('TO_DO', getToDo);
}
