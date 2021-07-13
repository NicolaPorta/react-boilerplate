import produce from 'immer';
import { LOGIN_SUCCESS_ACTION, LOGIN_ERROR_ACTION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS_ACTION: {
        draft.user = action.payload;
        document.cookie = `accessToken=${
          action.payload.accessToken
        }; expires=Thu, 25 Dec 2021 12:00:00 UTC; path=`;
        break;
      }
      case LOGIN_ERROR_ACTION:
        draft.err = action.payload;
        break;
    }
  });

export default loginReducer;
