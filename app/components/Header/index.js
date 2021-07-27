import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

function Header({ user }) {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        {!user ? (
          <FormattedMessage {...messages.user} />
        ) : (
          <React.Fragment>
            <HeaderLink to="/">
              <FormattedMessage {...messages.home} />
            </HeaderLink>
            <HeaderLink to="/features">
              <FormattedMessage {...messages.features} />
            </HeaderLink>
            <HeaderLink to="/toDos">
              <FormattedMessage {...messages.toDos} />
            </HeaderLink>
          </React.Fragment>
        )}
      </NavBar>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
