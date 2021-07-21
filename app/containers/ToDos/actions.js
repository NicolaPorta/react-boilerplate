/*
 *
 * ToDo actions
 *
 */
import createResponseAction from 'helpers/requestActionSupport/createResponseAction';
import {
  CALL_TODO_REJECTED,
  CALL_TODO_SUCCESS,
  CALL_TODO_LIST,
  CALL_ADD_TO_DO,
  DELETE_TODO,
  DELETE_TODO_ERROR,
  ADD_TO_DO_SUCCESS,
} from './constants';

export const callToDoSuccessAction = createResponseAction(CALL_TODO_SUCCESS);
export const callToDoErrorAction = createResponseAction(CALL_TODO_REJECTED);

// toDo call success
// export function changeToDo(toDo) {
//   return {
//     type: CALL_TODO_SUCCESS,
//     payload: toDo,
//   };
// }

// toDo call rejected
export function changeToDoError(err) {
  return {
    type: CALL_TODO_REJECTED,
    payload: err,
  };
}

// toDo click for activate saga middleware
export function clickToDo() {
  return {
    type: CALL_TODO_LIST,
  };
}

export function clickDeleteToDo(toDo) {
  return {
    type: DELETE_TODO,
    payload: toDo,
  };
}

export function clickDeleteToDoError() {
  return {
    type: DELETE_TODO_ERROR,
  };
}

export function addToDo(toDo) {
  return {
    type: CALL_ADD_TO_DO,
    payload: toDo,
  };
}

export function addToDoInList(toDo) {
  return {
    type: ADD_TO_DO_SUCCESS,
    payload: toDo,
  };
}
