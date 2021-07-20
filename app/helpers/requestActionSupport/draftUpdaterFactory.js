/* eslint no-param-reassign: ["error", {"props": true, "ignorePropertyModificationsFor": ["draft"] }] */

export const fetchInitialState = requestActionList => ({
  response: requestActionList.reduce(
    (prev, key) => ({
      ...prev,
      [key]: {},
    }),
    {},
  ),
});

export default function draftUpdaterFactory(
  successAction,
  errorAction,
  fetchActionList,
) {
  return (draft, action) => {
    switch (action.type) {
      case successAction:
        draft.response[action.fetchKey].data = action.payload;
        delete draft.response[action.fetchKey].error;
        delete draft.response[action.fetchKey].isLoading;
        break;

      case errorAction:
        draft.response[action.fetchKey].error = action.payload;
        delete draft.response[action.fetchKey].data;
        delete draft.response[action.fetchKey].isLoading;
        break;

      default:
        break;
    }
    if (fetchActionList.filter(act => act === action.type).length > 0) {
      const key = action.key || action.type;
      if (action.clearData) {
        draft.response[key] = {};
      } else {
        draft.response[key] = draft.response[key] || {};
      }
      draft.response[key].isLoading = true;
    }
    return draft;
  };
}
