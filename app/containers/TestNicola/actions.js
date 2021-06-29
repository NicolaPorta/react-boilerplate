/*
 *
 * ToDo actions
 *
 */

import {
  CALL_TODO_REJECTED,
  CALL_TODO_SUCCESS,
  CLICK,
  DELETE_TODO,
  DELETE_TODO_ERROR,
} from './constants';

// toDo call success
export function changeToDo(toDo) {
  return {
    type: CALL_TODO_SUCCESS,
    payload: toDo,
  };
}

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
    type: CLICK,
  };
}

export function clickDeleteToDo(toDo, toDoList) {
  return {
    type: DELETE_TODO,
    payload: {
      toDo,
      toDoList,
    },
  };
}

export function clickDeleteToDoError() {
  return {
    type: DELETE_TODO_ERROR,
  };
}
