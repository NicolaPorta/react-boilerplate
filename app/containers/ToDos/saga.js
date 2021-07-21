/**
 * Gets the list of the toDos from JsonPlaceholder
 */
import sagaGeneratorFactory from 'helpers/requestActionSupport/sagaGeneratorFactory';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  addToDoInList,
  changeToDoError,
  clickDeleteToDoError,
  callToDoSuccessAction,
  callToDoErrorAction,
} from './actions';
import getToDoList from '../../services/getToDoList';
import deleteToDo from '../../services/deleteToDo';
import addToDoList from '../../services/addToDoList';
import { CALL_ADD_TO_DO, CALL_TODO_LIST, DELETE_TODO } from './constants';
/**
 * ToDo list request/response handler
 */
const callToDoGenerator = sagaGeneratorFactory(
  callToDoSuccessAction,
  callToDoErrorAction,
);

export function* addNewToDo(action) {
  try {
    const todo = action.payload;
    // Call our request helper (see 'services/getToDoList')
    const newToDo = yield call(addToDoList, todo);
    yield put(addToDoInList(newToDo.data));
  } catch (err) {
    yield put(changeToDoError(err));
  }
}

export function* toDoDelete(action) {
  const { _id } = action.payload;
  try {
    // Call our request helper (see 'services/axiosDeleteToDo')
    yield call(deleteToDo, _id);
  } catch (err) {
    yield clickDeleteToDoError(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getToDoData() {
  yield takeLatest(DELETE_TODO, toDoDelete);
  yield takeLatest(CALL_TODO_LIST, callToDoGenerator(getToDoList));
  yield takeLatest(CALL_ADD_TO_DO, addNewToDo);
}
