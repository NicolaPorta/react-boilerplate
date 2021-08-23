/**
 * Gets the list of the toDos from JsonPlaceholder
 */
import { sagaGeneratorFactory } from 'helpers/requestActionSupport';
import { takeLatest } from 'redux-saga/effects';
import {
  fetchSuccessAction,
  fetchErrorAction,
  deleteSuccessAction,
  deleteErrorAction,
  addToDoSuccessAction,
  addToDoErrorAction,
} from './actions';
import getToDoList from '../../services/getToDoList';
import deleteToDo from '../../services/deleteToDo';
import addToDoList from '../../services/addToDoList';
import { CALL_ADD_TO_DO, CALL_TODO_LIST, DELETE_TODO } from './constants';
/**
 * ToDo list request/response handler
 */
const callToDoGenerator = sagaGeneratorFactory(
  fetchSuccessAction,
  fetchErrorAction,
);

const deleteToDoGenerator = sagaGeneratorFactory(
  deleteSuccessAction,
  deleteErrorAction,
);

const addToDoGenerator = sagaGeneratorFactory(
  addToDoSuccessAction,
  addToDoErrorAction,
);

/**
 * Root saga manages watcher lifecycle
 */
export default function* getToDoData() {
  yield takeLatest(DELETE_TODO, deleteToDoGenerator(deleteToDo));
  yield takeLatest(CALL_TODO_LIST, callToDoGenerator(getToDoList));
  yield takeLatest(CALL_ADD_TO_DO, addToDoGenerator(addToDoList));
}
