/*
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';
import { CALL_TODO_SUCCESS, CALL_TODO_REJECTED } from './constants';

export const initialState = {
  toDo: [],
  id: 1,
};

/* eslint-disable default-case, no-param-reassign */
const testNicolaReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CALL_TODO_SUCCESS:
        draft.toDo = action.payload;
        break;
      case CALL_TODO_REJECTED:
        draft.err = action.payload;
        break;
    }
  });

export default testNicolaReducer;
