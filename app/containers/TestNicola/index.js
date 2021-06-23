/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeSelectToDo } from './selectors';
import { clickToDo } from './actions';

export function TestNicola({toDoClick}) {
  return (
    <button onClick={(e) => toDoClick(e)}>CLICK</button>
  );
}

// TestNicola.propTypes = {
//   locale: PropTypes.string,
//   messages: PropTypes.object,
//   children: PropTypes.element.isRequired,
// };

const mapStateToProps = createSelector(
  makeSelectToDo(),
  toDo => ({
    toDo,
  }),
);

const mapDispatchToProps = dispatch => {
  return {
    toDoClick: () => dispatch(clickToDo())
  } 
}

// const mapDispatchToProps = {
//   change: changeToDo()
// }

export default connect(mapStateToProps, mapDispatchToProps)(TestNicola);
