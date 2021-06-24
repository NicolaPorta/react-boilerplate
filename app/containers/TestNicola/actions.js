/*
 *
 * ToDo actions
 *
 */

// toDo call success
export function changeToDo(toDo) {
  return {
    type: 'TO_DO_SUCCESS',
    payload: toDo,
  };
}

// toDo call rejected
export function changeToDoError(err) {
  return {
    type: 'TO_DO_ERROR',
    payload: err,
  };
}

// toDo click for activate saga middleware
export function clickToDo() {
  return {
    type: 'TO_DO_CLICK',
  };
}
