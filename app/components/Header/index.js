import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

function Header({ username }) {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink>
        <HeaderLink to="/toDos">
          <FormattedMessage {...messages.toDos} />
        </HeaderLink>
        {!username ? (
          <HeaderLink to="/login">
            <FormattedMessage {...messages.users} />
          </HeaderLink>
        ) : (
          ''
        )}
      </NavBar>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string,
};

export default Header;
