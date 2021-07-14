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
import { Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ToDos from 'containers/ToDos';
import Login from 'containers/Login';
import authSessionUser from '../../services/authSessionUser';
import { successUserLogin, errorUserLogin } from '../Login/actions';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App({ successLogin, username }) {
  const [login, setLogin] = useState();
  useEffect(() => {
    async function validation() {
      const auth = await authSessionUser().then(res => res.data);
      if (auth.success) {
        setLogin('isLogged');
        await successLogin(auth);
      } else {
        setLogin('notLogged');
      }
    }
    validation();
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
              successLogin({});
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        ''
      )}
      <Header />
      <Switch>
        {/* {user === {} ? <Redirect to="/login" /> : ''} */}
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/toDos" component={ToDos} />
        <Route path="/login" component={Login} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  successLogin: PropTypes.func,
  username: PropTypes.string,
};

const mapStateToProps = state => ({
  username: state.global.userLogin.name,
  user: state.global.userLogin,
});

const mapDispatchToProps = dispatch => ({
  successLogin: payload => dispatch(successUserLogin(payload)),
  errorLogin: payload => dispatch(errorUserLogin(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
