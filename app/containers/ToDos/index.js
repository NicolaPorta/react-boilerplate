/*
 *
 * ToDoList
 *
 */
import React from 'react';
// import PropTypes
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import the injecters
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { CALL_TODO_LIST } from './constants';
import reducer from './reducer';
import saga from './saga';
import { clickToDo, clickDeleteToDo, addToDo } from './actions';
import { makeSelectResponse, makeSelectToDo } from './selectors';

// create a id key for the injection
const key = 'toDos';
export function ToDos({ toDoClick, deleteClick, newToDo, response }) {
  // inject Hooks for reducers and sagas
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const toDoList = response[CALL_TODO_LIST];

  let input;

  return (
    <React.Fragment>
      <button type="submit" onClick={e => toDoClick(e)}>
        CLICK
      </button>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.value !== '') {
            newToDo({ toDo: input.value, key: CALL_TODO_LIST });
            input.value = '';
          }
        }}
      >
        <input
          type="text"
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">ADD</button>
      </form>
      {toDoList.data ? (
        toDoList.data.map(toDo => {
          const { _id } = toDo;
          return (
            <p key={_id}>
              {toDo.text}
              <button
                type="submit"
                onClick={() => deleteClick(toDo, CALL_TODO_LIST)}
              >
                Delete
              </button>
            </p>
          );
        })
      ) : (
        <em>To Do List does not exist</em>
      )}
    </React.Fragment>
  );
}

// set PropTypes
ToDos.propTypes = {
  toDoClick: PropTypes.func,
  deleteClick: PropTypes.func,
  newToDo: PropTypes.func,
  // toDoList: PropTypes.object,
  response: PropTypes.object,
};

// map props and functions
const mapStateToProps = createStructuredSelector({
  toDoList: makeSelectToDo(),
  response: makeSelectResponse(),
});

const mapDispatchToProps = dispatch => ({
  toDoClick: () => dispatch(clickToDo()),
  deleteClick: (payload, actionKey) =>
    dispatch(clickDeleteToDo(payload, actionKey)),
  newToDo: payload => dispatch(addToDo(payload)),
});

// connect the store
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ToDos);
