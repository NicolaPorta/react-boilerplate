/**
 * Gets the list of the toDos from JsonPlaceholder
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { changeToDo, changeToDoError, clickDeleteToDoError } from './actions';
import getToDoList, { deleteToDo } from './services/axiosService';
import { CLICK, DELETE_TODO } from './constants';

/**
 * ToDo list request/response handler
 */
export function* getToDo() {
  try {
    // Call our request helper (see 'services/axiosService')
    const toDos = yield call(getToDoList);
    yield put(changeToDo(toDos.data));
  } catch (err) {
    yield put(changeToDoError(err));
  }
}

export function* toDoDelete(action) {
  const toDoDeleted = action.toDo.replace(/\s+/g, '-').toLowerCase();
  try {
    // Call our request helper (see 'services/axiosService')
    yield call(deleteToDo, toDoDeleted);
  } catch (err) {
    yield clickDeleteToDoError(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getToDoData() {
  yield takeLatest(DELETE_TODO, toDoDelete);
  yield takeLatest(CLICK, getToDo);
}
