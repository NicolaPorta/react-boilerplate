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
import { clickToDo, clickDeleteToDo } from './actions';

// create a id key for the injection
const key = 'toDos';

export function ToDos({ toDoClick, deleteClick, toDoList }) {
  // inject Hooks for reducers and sagas
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-underscore-dangle */
  const c = {
    _id: 'test',
  };

  c._id = 'ciao';

  const toDoListCount = (toDoList && toDoList.toDo.length) || 0;

  return (
    <React.Fragment>
      <button type="submit" onClick={e => toDoClick(e)}>
        CLICK
      </button>
      {toDoListCount ? (
        toDoList.toDo.map(toDo => (
          <p key={toDo.id}>
            {toDo.text}
            <button type="submit" onClick={() => deleteClick(toDo)}>
              Delete
            </button>
          </p>
        ))
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
  toDoList: PropTypes.object,
};

// map props and functions
const mapStateToProps = state => ({
  toDoList: state.toDos,
});

const mapDispatchToProps = dispatch => ({
  toDoClick: () => dispatch(clickToDo()),
  deleteClick: payload => dispatch(clickDeleteToDo(payload)),
});

// connect the store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDos);
