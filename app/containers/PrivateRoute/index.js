import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  redirect: pathname,
}) => (
  <Route
    render={props => {
      if (!isAuthenticated) {
        return <Component {...props} />;
      }
      return <Redirect to={pathname} />;
    }}
  />
);

PrivateRoute.defaultProps = { redirect: '/login' };

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.elementType.isRequired,
  redirect: PropTypes.string,
  redirectExternal: PropTypes.string,
  location: PropTypes.object,
};

export default PrivateRoute;
