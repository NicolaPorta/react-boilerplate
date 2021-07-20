# Request Action Support

## Rationale

While designing some new container we might be required to create some set of actions,
oftentimes asynchronous, that trigger back some result or error actions.

Implementing this request/result/error actions triad results into writing a big bunch of boilerplate-code spread into multiple files, including costants.js, action.js, saga.js, reducer.js and select.js.

In order to reduce this boilerplate-code the Request Action Support provides a set of helpers functions to implement this pattern with ease in your container.

Rather then having to write a result and an error action for each request action you'll only need 2 generic success and error actions.

The response will be reduced and selected into a single object containing errors, results and loading state. We'll use the request key to extract the respesctive error/result/loading flag. 


## Using the system

Let's suppose you need to fetch some data from a service api.

In your `constants.js` you'll write your action constants
and to get errors and results from them, 
you also need to create 2 more actions constants as follows:

```diff
// constants.js
export const FETCH_VENUES_ACTION = 'app/CreaPermessoStep1/FETCH_VENUES_ACTION';
export const FETCH_PROVINCES_ACTION =
  'app/CreaPermessoStep1/FETCH_PROVINCES_ACTION';

+ export const FETCH_SUCCESS_ACTION = 'app/CreaPermessoStep1/FETCH_SUCCESS_ACTION';
+ export const FETCH_ERROR_ACTION = 'app/CreaPermessoStep1/FETCH_ERROR_ACTION';
```

Your `actions.js` instead will look like this:
```diff
// actions.js
import {
+  FETCH_SUCCESS_ACTION,
+  FETCH_ERROR_ACTION,
  FETCH_VENUES_ACTION,
  FETCH_PROVINCES_ACTION,
} from './constants';

export function fetchVenuesAction(payload) {
  return {
    type: FETCH_VENUES_ACTION,
    payload,
  };
}

export function fetchProvincesAction(payload) {
  return {
    type: FETCH_PROVINCES_ACTION,
+   // key: 'dynamic_key'
+   // an optional key can also be provided for a more flexible access the response data:
+   // const provinces = response['dynamic_key'];
    payload,
  };

// createResponseAction creates generic error and result actions
// this actions are then used by saga.js to trigger the response
+ import { createResponseAction } from 'helpers/requestActionSupport';
+ export const fetchSuccessAction = createResponseAction(FETCH_SUCCESS_ACTION);
+ export const fetchErrorAction = createResponseAction(FETCH_ERROR_ACTION);
}
```

In `saga.js` we use `sagaGeneratorFactory` to create a generic generator
that given a service-api function and the request action constant will:
perform the request (execute the service function) and trigger back the `result action` or the `error action`.

```diff
// saga.js
import { takeEvery } from 'redux-saga/effects';
+ import { fetchSuccessAction, fetchErrorAction } from './actions';
+ import { FETCH_VENUES_ACTION, FETCH_PROVINCES_ACTION } from './constants';

 import getVenues from '../../services/pop/getVenues';
 import getProvinces from '../../services/common/sol/getProvinces';

+ import { sagaGeneratorFactory } from 'helpers/requestActionSupport';
+ const fetchGenerator = sagaGeneratorFactory(
+   fetchSuccessAction,
+   fetchErrorAction,
+ );

export default function* creaPermessoStep1Saga() {
+  yield takeEvery(FETCH_VENUES_ACTION, fetchGenerator(getVenues));
+ yield takeEvery(FETCH_PROVINCES_ACTION, fetchGenerator(getProvinces));
}
```

In `reducer.js`, we use `draftUpdaterFactory` to create an update function that will reduce results, errors and the loading state (boolean flag). We also inject the initial state.

```diff
// reducer.js
import produce from 'immer';
import {
  FETCH_VENUES_ACTION,
  FETCH_PROVINCES_ACTION,
+  FETCH_SUCCESS_ACTION,
+  FETCH_ERROR_ACTION,
} from './constants';

+ import {
+   draftUpdaterFactory,
+   fetchInitialState,
+ } from 'helpers/requestActionSupport';

// define a request action lists
+ const fetchActionList = [FETCH_VENUES_ACTION, FETCH_PROVINCES_ACTION];

// inject the initial state
+ export const initialState = {
+   ...fetchInitialState(fetchActionList),
+ };

// create the updateDraft function
+ const updateDraft = draftUpdaterFactory(
+   FETCH_SUCCESS_ACTION,
+   FETCH_ERROR_ACTION,
+   fetchActionList,
+ );

const creaPermessoStep1Reducer = (state = initialState, action) =>
  produce(state, draft => {
    // update our draft with results, errors and loading
+   updateDraft(draft, action);

    // any other action can be still handled with the classic  switch:
    switch (action.type) {
      default:
        break;
    }
  });

export default creaPermessoStep1Reducer;
```

In `selector.js` you only need to export a selector that will then be used by your `index.js` to get the response:
```diff
import { createSelector } from 'reselect';
import { initialState } from './reducer';
+ import { makeSelectFactory } from 'helpers/requestActionSupport';

const selectCreaPermessoStep1Domain = state =>
  state.creaPermessoStep1 || initialState;

const makeSelectCreaPermessoStep1 = () =>
  createSelector(
    selectCreaPermessoStep1Domain,
    substate => substate,
  );

// create default selector and export it
+ const makeSelectResponse = makeSelectFactory(selectCreaPermessoStep1Domain);

export default makeSelectCreaPermessoStep1;
export { 
  selectCreaPermessoStep1Domain, 
+  makeSelectResponse,
 };
```


Finally in `index.js` you import the selector along with the request actions and constants:
```diff
+ import { fetchVenuesAction, fetchProvincesAction } from './actions
+ import { FETCH_VENUES_ACTION, FETCH_PROVINCES_ACTION } from './constants
+ import makeSelectCreaPermessoStep1, { makeSelectResponse } from './selectors';
```


The response is reduced and selected into a single object containing errors, results and loading state. We'll use the request action's constant key to extract the respesctive error/result/loading flag.
```diff
export function CreaPermessoStep1({
  handleNext,

  handleFetchVenues,
  handleFetchProvinces,

+  response, // new prop
}) {

  useInjectReducer({ key: CONTAINER_KEY, reducer });
  useInjectSaga({ key: CONTAINER_KEY, saga });

  // extract results, errors and loading state
+  const venues = response[FETCH_VENUES_ACTION];
  // check then venues.data, venues.error, venues.isLoading
+  const municipalities = response[FETCH_MUNICIPALITIES_ACTION];
+  const venuesHistory = response[FETCH_SELECTED_VENUES_HISTORY_ACTION];

```

```diff
CreaPermessoStep1.propTypes = {
  handleNext: PropTypes.func.isRequired,

  handleFetchVenues: PropTypes.func,
  handleFetchProvinces: PropTypes.func,

+  response: PropTypes.object, // new prop
};

const mapStateToProps = createStructuredSelector({
  creaPermessoStep1: makeSelectCreaPermessoStep1(),
+  response: makeSelectResponse(), // new prop
});
```


Of course we also map props to trigger request actions:
```javascript
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleFetchVenues: payload => dispatch(fetchVenuesAction(payload)),
    handleFetchProvinces: payload => dispatch(fetchProvincesAction(payload)),
  };
}
```

Here's the full `index.js` file:
```diff
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SearchBar from '@spindox/siae-searchbar';
import Heading from '@spindox/siae-heading';
import List from '@spindox/siae-generic-list';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

+ import makeSelectCreaPermessoStep1, { makeSelectResponse } from './selectors';
+ import { fetchVenuesAction, fetchProvincesAction } from './actions';
+ import { FETCH_VENUES_ACTION, FETCH_PROVINCES_ACTION } from './constants';

const CONTAINER_KEY = 'creaPermessoStep1';

export function CreaPermessoStep1({
  handleNext,

  handleFetchVenues,
  handleFetchProvinces,

+  response,
}) {
  useInjectReducer({ key: CONTAINER_KEY, reducer });
  useInjectSaga({ key: CONTAINER_KEY, saga });

+  const venues = response[FETCH_VENUES_ACTION];
+  const provinces = response[FETCH_PROVINCES_ACTION];

+  useEffect(() => {
+    if (venues.data === undefined) {
+      handleFetchVenues();
+    }
+    if (provinces.data === undefined) {
+      handleFetchProvinces();
+    }
+  }, [response]);

  const handleClick = () => {
    handleFetchProvinces();
  };

  return (
    <>
+      {venues.isLoading ? 'venues loading' : 'venus not loading'}
      <br />
+      {provinces.isLoading ? 'provinces loading' : 'provinces not loading'}
      <Heading
        title={<FormattedMessage {...messages.titolo} />}
        subtitle={<FormattedMessage {...messages.sottotitolo} />}
      />
      <SearchBar
        placeholderText1="Nome Locale"
        placeholderText2="Indirizzo Locale"
        variant="double"
        onclick={handleClick}
      />
      {venues.data && (
        <List
          variant="venue"
-          items={{}}          
+          items={venues.data}
          additionalProps={{
            onClick: handleNext,
          }}
        />
      )}
+      {venues.error && <div>{venues.error.message} </div>}
+      {provices.error && <div>{provices.error.message} </div>}
    </>
  );
}

CreaPermessoStep1.propTypes = {
  handleNext: PropTypes.func.isRequired,

  handleFetchVenues: PropTypes.func,
  handleFetchProvinces: PropTypes.func,

+  response: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  creaPermessoStep1: makeSelectCreaPermessoStep1(),
+  response: makeSelectResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleFetchVenues: payload => dispatch(fetchVenuesAction(payload)),
    handleFetchProvinces: payload => dispatch(fetchProvincesAction(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreaPermessoStep1);
```
