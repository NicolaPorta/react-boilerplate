import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import A from 'components/A';
import LocaleSelect from '@nicola/localeselect';
import { changeLocale } from '../../containers/LanguageProvider/actions';
import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';
import { appLocales } from '../../i18n';
import Wrapper from './Wrapper';
import messagesFooter from './messages';
import messages from './localeMessages';

function Footer({ locale, onLocaleToggle }) {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messagesFooter.licenseMessage} />
      </section>
      <section>
        <LocaleSelect
          value={locale}
          values={appLocales}
          messages={messages}
          onToggle={onLocaleToggle}
        />
      </section>
      <section>
        <FormattedMessage
          {...messagesFooter.authorMessage}
          values={{
            author: <A href="https://github.com/NicolaPorta">Nicola Porta</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

Footer.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: e => dispatch(changeLocale(e)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
