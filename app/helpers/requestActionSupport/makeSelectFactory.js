import { createSelector } from 'reselect';

export default function makeSelectFactory(domain, key) {
  return () =>
    createSelector(
      domain,
      substate =>
        key && substate.response ? substate.response[key] : substate.response,
    );
}
