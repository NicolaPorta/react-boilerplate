/*
 *
 * ToDoList
 *
 */

import React from 'react';
// import PropTypes
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import the injecters
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { clickToDo } from './actions';

// create a id key for the injection
const key = 'ToDos';

export function TestNicola({ toDoClick, toDoList }) {
  // inject Hooks for reducers and sagas
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <React.Fragment>
      <button type="submit" onClick={e => toDoClick(e)}>
        CLICK
      </button>
      {toDoList && toDoList.toDo.length > 0 ? (
        toDoList.toDo.map(toDo => <p key={toDo.id}>{toDo.title}</p>)
      ) : (
        <em>To Do List does not exist</em>
      )}
    </React.Fragment>
  );
}

// set PropTypes
TestNicola.propTypes = {
  toDoClick: PropTypes.func,
  toDoList: PropTypes.object,
};

// map props and functions
const mapStateToProps = state => ({
  toDoList: state.ToDos,
});

const mapDispatchToProps = dispatch => ({
  toDoClick: () => dispatch(clickToDo()),
});

// connect the store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestNicola);
