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
  ADD_TO_DO_SUCCESS,
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
      case DELETE_TODO: {
        const { _id } = action.payload;
        // eslint-disable-next-line no-underscore-dangle
        draft.toDo = state.toDo.filter(toDo => toDo._id !== _id);
        break;
      }
      case ADD_TO_DO_SUCCESS: {
        draft.toDo[draft.toDo.length] = action.payload.todo;
      }
    }
  });

export default toDosReducer;
