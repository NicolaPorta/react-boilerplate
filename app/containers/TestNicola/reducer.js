/*
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';

export const initialState = {
  toDo: [],
  id: 1
};

/* eslint-disable default-case, no-param-reassign */
const testNicolaReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'TO_DO':
        break;
      case 'TO_DO_SUCCESS':
        draft.toDo = action.payload;
        break;
      case 'TO_DO_ERROR':
        draft.err = action.payload;
        break;
    }
  });

export default testNicolaReducer;
