/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { changeToDo, changeToDoError } from './actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getToDo() {
  // Select username from store
  const requestURL = `https://jsonplaceholder.typicode.com/todos/1`;
  try {
    // Call our request helper (see 'utils/request')
    const toDos = yield call(request, requestURL);
    console.log(toDos);
    yield put(changeToDo(toDos));
  } catch (err) {
    yield put(changeToDoError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getToDoData() {
  yield takeLatest('TO_DO_CLICK', getToDo);
}
