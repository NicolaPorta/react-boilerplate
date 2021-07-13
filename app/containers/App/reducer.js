/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';
import { LOGIN_SUCCESS_ACTION, LOGIN_ERROR_ACTION } from '../Login/constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOGIN_SUCCESS_ACTION: {
        const { name, surname, accessToken } = action.payload;
        document.cookie = `accessToken=${accessToken}; expires=Thu, 25 Dec 2021 12:00:00 UTC; path=`;
        console.log(document.cookie);
        draft.userLogin = {
          name,
          surname,
        };
        break;
      }

      case LOGIN_ERROR_ACTION:
        draft.err = action.payload;
        break;
    }
  });

export default appReducer;
