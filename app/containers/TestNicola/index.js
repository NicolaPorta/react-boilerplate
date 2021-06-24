/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { clickToDo } from './actions';

const key = 'ToDos';

export function TestNicola({ toDoClick, toDoList }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <React.Fragment>
      <button type="submit" onClick={e => toDoClick(e)}>
        CLICK
      </button>
      {toDoList ? (
        toDoList.map(toDo => <p>{toDo.title}</p>)
      ) : (
        <em>To Do List not exist</em>
      )}
    </React.Fragment>
  );
}

TestNicola.propTypes = {
  toDoClick: PropTypes.func,
  toDoList: PropTypes.array,
};

// const mapStateToProps = createSelector(
//   makeSelectToDo(),
//   toDo => ({
//     toDo,
//   }),
// );

const mapStateToProps = state => ({
  toDoList: state.toDo,
});

const mapDispatchToProps = dispatch => ({
  toDoClick: () => dispatch(clickToDo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestNicola);
