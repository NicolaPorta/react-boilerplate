import React from 'react';
// import PropTypes
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
// import the injecters
import injectSaga from 'utils/injectSaga';

import saga from './saga';
import { userLogin } from './actions';

export function Login({ requestUserLogin }) {
  let email;
  let password;

  return (
    <React.Fragment>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="A Nicola React App application Login"
        />
      </Helmet>
      <form
        onSubmit={e => {
          e.preventDefault();
          const info = {
            email: email.value,
            password: password.value,
          };
          requestUserLogin(info);
          if (email || password) {
            email.value = '';
            password.value = '';
          }
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            name="email"
            type="email"
            placeholder="Insert email"
            ref={node => {
              email = node;
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            name="password"
            type="password"
            placeholder="Insert password"
            ref={node => {
              password = node;
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </React.Fragment>
  );
}
// set PropTypes
Login.propTypes = {
  requestUserLogin: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  requestUserLogin: payload => dispatch(userLogin(payload)),
});

const withSaga = injectSaga({ key: 'login', saga, mode: null });

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(Login);
