import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the todo domain
 */
const selectTodo = state => state.toDo || initialState;
/**
 * Select the todo
 */

const makeSelectToDo = () =>
  createSelector(
    selectTodo,
    toDoState => toDoState.toDo,
  );

export { selectTodo, makeSelectToDo };
