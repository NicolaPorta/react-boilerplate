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
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
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
import reducer from '../ToDos/reducer';
import { LOGIN_ACTION } from '../Login/constants';
import { deleteToDoList } from './actions';
import { CALL_TODO_LIST } from '../ToDos/constants';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export function App({ authUser, userLogout, response, deleteToDos }) {
  useEffect(() => {
    authUser(LOGIN_ACTION);
  }, []);
  const user = response[LOGIN_ACTION].data;
  if (!user) {
    deleteToDos(CALL_TODO_LIST);
  }
  const classes = useStyles();
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Nicola React App"
        defaultTitle="Nicola React App"
      >
        <meta name="description" content="A Nicola React App application" />
      </Helmet>
      {user ? (
        <React.Fragment>
          <div className={classes.root}>
            <br />
            Hello,
            <strong> {user.name} </strong>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                Cookies.remove('accessToken');
                userLogout(LOGIN_ACTION);
              }}
            >
              Logout
            </Button>
          </div>
          <br />
        </React.Fragment>
      ) : (
        ''
      )}
      <Header user={user} />
      <Switch>
        <PrivateRoute
          component={HomePage}
          exact
          path="/"
          isAuthenticated={user}
        />
        <PrivateRoute
          component={FeaturePage}
          path="/features"
          isAuthenticated={user}
        />
        <PrivateRoute component={ToDos} path="/toDos" isAuthenticated={user} />
        <Route path="/login" component={Login}>
          {user ? <Redirect to="/" /> : ''}
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
  deleteToDos: PropTypes.func,
  authUser: PropTypes.func,
  response: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  response: makeResponseUserLogin(),
});

const mapDispatchToProps = dispatch => ({
  userLogout: payload => dispatch(logout(payload)),
  authUser: payload => dispatch(authUserValidation(payload)),
  deleteToDos: payload => dispatch(deleteToDoList(payload)),
});

const withSaga = injectSaga({ key: 'app', saga, mode: null });
const withReducer = injectReducer({ key: 'app', reducer, mode: null });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(App);
