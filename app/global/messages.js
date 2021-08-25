import { defineMessages } from 'react-intl';

export const scope = 'NicolaApp.global';

export default defineMessages({
  ErrorMissingCredentials: {
    id: `${scope}.ErrorMissingCredentials`,
    defaultMessage: 'Missing email and password',
  },
});
