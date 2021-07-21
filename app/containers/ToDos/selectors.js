import { createSelector } from 'reselect';
import { makeSelectFactory } from 'helpers/requestActionSupport';
import { initialState } from './reducer';
/**
 * Direct selector to the todo domain
 */
const selectTodo = state => state.toDos || initialState;
/**
 * Select the todo
 */
const makeSelectResponse = makeSelectFactory(selectTodo);
const makeSelectToDo = () =>
  createSelector(
    selectTodo,
    toDoState => toDoState.toDo,
  );

export { selectTodo, makeSelectToDo, makeSelectResponse };
