/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'NicolaApp.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  toDos: {
    id: `${scope}.toDosButton`,
    defaultMessage: 'ToDo List',
  },
  user: {
    id: `${scope}.loginButtonText`,
    defaultMessage: 'LOGIN',
  },
});
