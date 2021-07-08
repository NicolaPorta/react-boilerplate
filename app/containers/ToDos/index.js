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
import { clickToDo, clickDeleteToDo, addToDo } from './actions';

// create a id key for the injection
const key = 'toDos';

export function ToDos({ toDoClick, deleteClick, newToDo, toDoList }) {
  // inject Hooks for reducers and sagas
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const toDoListCount = (toDoList && toDoList.toDo.length) || 0;

  let input;

  return (
    <React.Fragment>
      <button type="submit" onClick={e => toDoClick(e)}>
        CLICK
      </button>
      <form
        onSubmit={e => {
          e.preventDefault();
          newToDo({ toDo: input.value });
          input.value = '';
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
      {toDoListCount ? (
        toDoList.toDo.map(toDo => {
          const { _id } = toDo;
          return (
            <p key={_id}>
              {toDo.text}
              <button type="submit" onClick={() => deleteClick(toDo)}>
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
  toDoList: PropTypes.object,
};

// map props and functions
const mapStateToProps = state => ({
  toDoList: state.toDos,
});

const mapDispatchToProps = dispatch => ({
  toDoClick: () => dispatch(clickToDo()),
  deleteClick: payload => dispatch(clickDeleteToDo(payload)),
  newToDo: payload => dispatch(addToDo(payload)),
});

// connect the store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDos);
