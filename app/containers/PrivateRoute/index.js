import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  redirect: pathname,
  // path: url,
}) => (
  <Route
    render={props => {
      if (isAuthenticated) {
        return <Component {...props} />;
      }
      return <Redirect to={pathname} />;
    }}
  />
);

PrivateRoute.defaultProps = { redirect: '/login' };

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.object,
  component: PropTypes.elementType.isRequired,
  redirect: PropTypes.string,
  // path: PropTypes.string,
};

export default PrivateRoute;
