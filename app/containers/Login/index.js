import React from 'react';
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

export function Login({ requestUserLogin }) {
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
        email.value = '';
        password.value = '';
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
  );
}
// set PropTypes
Login.propTypes = {
  requestUserLogin: PropTypes.func,
  // err: PropTypes.object,
};

const mapStateToProps = state => ({
  err: state.global.err,
});

const mapDispatchToProps = dispatch => ({
  requestUserLogin: payload => dispatch(userLogin(payload)),
});

// connect the store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
