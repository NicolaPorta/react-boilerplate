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
        draft.toDo = action.toDo;
        break;
    }
  });

export default testNicolaReducer;
