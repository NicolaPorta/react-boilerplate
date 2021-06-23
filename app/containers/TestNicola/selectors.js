import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the language domain
 */

const selectTodo = state => state.todo || initialState;
const selectId = state => state.id || initialState;
/**
 * Select the language locale
 */

const makeSelectToDo = () =>
  createSelector(
    selectTodo,
    toDoState => toDoState.toDo,
  );

const makeSelectId = () =>
createSelector(
  selectId,
  toDoState => toDoState.id,
);

export {selectId, selectTodo, makeSelectToDo, makeSelectId };
