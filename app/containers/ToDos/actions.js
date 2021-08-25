/*
 *
 * ToDo actions
 *
 */
import { createResponseAction } from 'helpers/requestActionSupport';
import {
  CALL_TODO_LIST,
  FETCH_ACTION_SUCCESS,
  FETCH_ACTION_ERROR,
  DELETE_TODO,
  DELETE_ACTION_SUCCESS,
  DELETE_ACTION_ERROR,
  CALL_ADD_TO_DO,
  ADD_TODO_ACTION_SUCCESS,
  ADD_TODO_ACTION_ERROR,
} from './constants';

export const fetchSuccessAction = createResponseAction(FETCH_ACTION_SUCCESS);
export const fetchErrorAction = createResponseAction(FETCH_ACTION_ERROR);

export const deleteSuccessAction = createResponseAction(DELETE_ACTION_SUCCESS);
export const deleteErrorAction = createResponseAction(DELETE_ACTION_ERROR);

export const addToDoSuccessAction = createResponseAction(
  ADD_TODO_ACTION_SUCCESS,
);
export const addToDoErrorAction = createResponseAction(ADD_TODO_ACTION_ERROR);
// toDo click for activate saga middleware
export function clickToDo() {
  return {
    type: CALL_TODO_LIST,
  };
}

export function clickDeleteToDo(toDo, key) {
  return {
    type: DELETE_TODO,
    key,
    payload: toDo,
    snackbar: {
      success: {
        message: 'ToDo has been deleted successfully',
        severity: 'success',
        hidden: false,
      },
    },
  };
}

export function addToDo(toDo) {
  return {
    type: CALL_ADD_TO_DO,
    key: toDo.key,
    payload: toDo,
    snackbar: {
      success: {
        message: 'ToDo has been added successfully',
        severity: 'success',
        hidden: false,
      },
    },
  };
}
