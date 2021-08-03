import React from 'react';
// import PropTypes
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
// import the injecters
import injectSaga from 'utils/injectSaga';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
      <br />
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
          <TextField
            required
            id="standard-required"
            label="Username"
            inputRef={node => {
              email = node;
            }}
          />
        </div>
        <br />
        <div>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            inputRef={node => {
              password = node;
            }}
          />
        </div>
        <br />
        <Button type="submit" variant="contained" color="secondary">
          Login
        </Button>
      </form>
      <br />
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
