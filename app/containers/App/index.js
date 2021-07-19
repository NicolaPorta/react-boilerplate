/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ToDos from 'containers/ToDos';
import Login from 'containers/Login';
import { authUserValidation, logout } from '../Login/actions';
// import PrivateRoute from '../PrivateRoute';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App({ username, err, authUser, userLogout }) {
  const [login, setLogin] = useState();
  useEffect(() => {
    authUser();
    if (err === undefined) {
      setLogin('isLogged');
    } else setLogin('notLogged');
  }, [login]);
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {username ? (
        <div>
          Hello,
          <strong> {username}</strong>
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
        // <Redirect to="/login" />
        ''
      )}
      <Header />
      <Switch>
        {/* <PrivateRoute
          component={HomePage}
          exact path="/"
          isAuthenticated={username}
        /> */}
        <Route exact path="/" component={HomePage}>
          {!username ? <Redirect to="/login" /> : ''}
        </Route>
        <Route path="/features" component={FeaturePage} />
        <Route path="/toDos" component={ToDos} />
        <Route path="/login" component={Login}>
          {username ? <Redirect to="/" /> : ''}
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
  authUser: PropTypes.func,
  username: PropTypes.string,
  err: PropTypes.object,
};

const mapStateToProps = state => ({
  username: state.global.userLogin.name,
  user: state.global.userLogin,
  err: state.global.err,
});

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(logout()),
  authUser: () => dispatch(authUserValidation()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
