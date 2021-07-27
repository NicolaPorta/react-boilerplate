/*
 *
 * ToDoList reducer
 *
 */
import {
  draftUpdaterFactory,
  fetchInitialState,
} from 'helpers/requestActionSupport';

import produce from 'immer';
import {
  FETCH_ACTION_SUCCESS,
  FETCH_ACTION_ERROR,
  CALL_TODO_LIST,
  DELETE_ACTION_SUCCESS,
  ADD_TODO_ACTION_SUCCESS,
} from './constants';

const fetchActionList = [CALL_TODO_LIST];
export const initialState = {
  ...fetchInitialState(fetchActionList),
};

const updateDraft = draftUpdaterFactory(
  FETCH_ACTION_SUCCESS,
  FETCH_ACTION_ERROR,
  fetchActionList,
);
/* eslint-disable default-case, no-param-reassign */
const toDosReducer = (state = initialState, action) =>
  produce(state, draft => {
    updateDraft(draft, action);
    switch (action.type) {
      case DELETE_ACTION_SUCCESS: {
        const { _id } = action.payload.todo;
        const { fetchKey } = action;
        const toDos = state.response[fetchKey].data;
        draft.response[fetchKey].data = toDos.filter(
          ({ _id: toDoId }) => toDoId !== _id,
        );
        break;
      }
      case ADD_TODO_ACTION_SUCCESS: {
        const { todo } = action.payload;
        const { fetchKey } = action;
        const toDos = draft.response[fetchKey].data;
        toDos.push(todo);
      }
    }
  });

export default toDosReducer;
