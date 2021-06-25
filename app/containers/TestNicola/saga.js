/**
 * Gets the list of the toDos from JsonPlaceholder
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { changeToDo, changeToDoError } from './actions';
import getToDoList from './services/axiosService';
import { CLICK, TO_DO_LIST } from './constants';

/**
 * ToDo list request/response handler
 */
export function* getToDo() {
  try {
    // Call our request helper (see 'services/axiosService')
    const toDos = yield call(getToDoList, TO_DO_LIST);
    yield put(changeToDo(toDos.data));
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
