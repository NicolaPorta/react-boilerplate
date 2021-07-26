/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ToDos from 'containers/ToDos';
import Login from 'containers/Login';
import { makeResponseUserLogin } from './selectors';
import { authUserValidation, logout } from '../Login/actions';
import PrivateRoute from '../PrivateRoute';
import GlobalStyle from '../../global-styles';
import saga from './saga';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App({ userLogout, user }) {
  useEffect(() => {
    // authUser();
  }, []);
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {user.name ? (
        <div>
          Hello,
          <strong> {user.name}</strong>
          <button
            type="submit"
            onClick={() => {
              Cookies.remove('accessToken');
              userLogout();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        ''
      )}
      <Header username={user.name} />
      <Switch>
        <PrivateRoute
          component={HomePage}
          exact
          path="/"
          isAuthenticated={user.name}
        />
        <PrivateRoute
          component={FeaturePage}
          path="/features"
          isAuthenticated={user.name}
        />
        <PrivateRoute
          component={ToDos}
          path="/toDos"
          isAuthenticated={user.name}
        />
        <Route path="/login" component={Login}>
          {user.login ? <Redirect to="/" /> : ''}
        </Route>
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  userLogout: PropTypes.func,
  // authUser: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeResponseUserLogin(),
});

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(logout()),
  authUser: () => dispatch(authUserValidation()),
});

const withSaga = injectSaga({ key: 'app', saga, mode: null });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(App);
