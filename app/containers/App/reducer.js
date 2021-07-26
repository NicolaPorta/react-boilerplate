/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import {
  draftUpdaterFactory,
  fetchInitialState,
} from 'helpers/requestActionSupport';

import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  LOGOUT_SUCCESS_ACTION,
  LOGOUT_ERROR_ACTION,
} from 'containers/Login/constants';
import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';
const loginActionList = [LOGIN_ACTION];
// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  userLogin: {
    ...fetchInitialState(loginActionList),
  },
};

const updateDraftLogin = draftUpdaterFactory(
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  loginActionList,
);
/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    updateDraftLogin(draft.userLogin, action);
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

      case LOGOUT_SUCCESS_ACTION:
        draft.userLogin = { ...fetchInitialState(loginActionList) };
        break;

      case LOGOUT_ERROR_ACTION:
        draft.userLogin.err = {
          error: 'ErrorLogout',
          message: 'Logout failed',
        };
        break;
    }
  });

export default appReducer;
