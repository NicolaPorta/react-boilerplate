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
  DELETE_TODO,
  ADD_TO_DO_SUCCESS,
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
