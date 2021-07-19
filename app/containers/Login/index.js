import React from 'react';
import { Redirect } from 'react-router';
// import PropTypes
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import the injecters
// import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

// import reducer from './reducer';
import saga from './saga';
import { userLogin } from './actions';
// create a id key for the injection
const key = 'login';

export function Login({ requestUserLogin, auth }) {
  useInjectSaga({ key, saga });
  let email;
  let password;

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const info = {
          email: email.value,
          password: password.value,
        };
        await requestUserLogin(info);
      }}
    >
      <div>
        {auth.name ? <Redirect to="/" /> : ''}
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
  );
}
// set PropTypes
Login.propTypes = {
  requestUserLogin: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.global.userLogin,
});

const mapDispatchToProps = dispatch => ({
  requestUserLogin: payload => dispatch(userLogin(payload)),
});

// connect the store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
