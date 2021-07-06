/**
 * Gets the list of the toDos from JsonPlaceholder
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { changeToDo, changeToDoError, clickDeleteToDoError } from './actions';
import getToDoList from '../../services/getToDoList';
import deleteToDo from '../../services/deleteToDo';
import { CALL_TODO_LIST, DELETE_TODO } from './constants';
import schema from '../../schemas/ToDos/getToDoListValidation';

/**
 * ToDo list request/response handler
 */
export function* getToDo() {
  try {
    // Call our request helper (see 'services/axiosGetToDo')
    const toDos = yield call(getToDoList);
    const validation = schema.validate(toDos.data);
    if (validation.error) alert(`${validation.error.message}`);
    else yield put(changeToDo(toDos.data));
  } catch (err) {
    yield put(changeToDoError(err));
  }
}

export function* toDoDelete(action) {
  const { id } = action.payload;
  try {
    // Call our request helper (see 'services/axiosDeleteToDo')
    yield call(deleteToDo, id);
  } catch (err) {
    yield clickDeleteToDoError(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getToDoData() {
  yield takeLatest(DELETE_TODO, toDoDelete);
  yield takeLatest(CALL_TODO_LIST, getToDo);
}
