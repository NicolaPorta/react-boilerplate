/**
 * Gets the list of the toDos from JsonPlaceholder
 */

import { put, takeLatest } from 'redux-saga/effects';
import { changeToDo, changeToDoError } from './actions';
import proxy from './services/axiosService';
import { CLICK } from './constants';

/**
 * ToDo list request/response handler
 */
export function* getToDo() {
  try {
    // Call our request helper (see 'services/axiosService')
    const toDos = yield proxy().then(res => res.data);
    yield put(changeToDo(toDos));
  } catch (err) {
    yield put(changeToDoError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getToDoData() {
  yield takeLatest(CLICK, getToDo);
}
