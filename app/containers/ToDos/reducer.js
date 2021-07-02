/*
 *
 * ToDoList reducer
 *
 */

import produce from 'immer';
import {
  CALL_TODO_SUCCESS,
  CALL_TODO_REJECTED,
  DELETE_TODO,
} from './constants';

export const initialState = {
  toDo: [],
};

/* eslint-disable default-case, no-param-reassign */
const toDosReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CALL_TODO_SUCCESS:
        draft.toDo = action.payload;
        break;
      case CALL_TODO_REJECTED:
        draft.err = action.payload;
        break;
      case DELETE_TODO:
        draft.toDo = state.toDo.filter(toDo => toDo.id !== action.payload.id);
        break;
    }
  });

export default toDosReducer;
