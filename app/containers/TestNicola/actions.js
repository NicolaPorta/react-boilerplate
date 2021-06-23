/*
 *
 * LanguageProvider actions
 *
 */
// import axios from 'axios';

export function changeToDo(toDo) {
  return {
    type: 'TO_DO_SUCCESS',
    payload: toDo
  };
}

export function changeToDoError(err) {
  return {
    type: 'TO_DO_ERROR',
    payload: err
  };
}

export function clickToDo() {
  return {
    type: 'TO_DO_CLICK'
  };
}