/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { makeSelectFactory } from 'helpers/requestActionSupport';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUserLogin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userLogin,
  );
const makeResponseGlobal = makeSelectFactory(selectGlobal);

const makeSelectUserName = () =>
  createSelector(
    makeSelectUserLogin(),
    userLoginState => userLoginState.name,
  );

const makeSelectLogin = () =>
  createSelector(
    makeSelectUserLogin(),
    userLoginState => userLoginState.login,
  );
export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectUserName,
  makeSelectLogin,
  makeResponseGlobal,
};
