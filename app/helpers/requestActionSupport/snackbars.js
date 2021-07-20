// import { put } from 'redux-saga/effects';
// import { actions } from '@spindox/siae-snackbar-notistack';
// import { getErrorMessage } from 'messages/errors';

// export default function* checkForSnackbars(key, reqAction, error) {
//   if (error) {
//     const hidden = getSnackbarField('error', 'hidden', reqAction.snackbar);
//     if (!hidden) {
//       // visible by default
//       yield showSnackbarError(key, reqAction, error);
//     }
//   } else {
//     const hidden = getSnackbarField('success', 'hidden', reqAction.snackbar);
//     if (hidden === false) {
//       // hidden by default
//       yield showSnackbarSuccess(key, reqAction);
//     }
//   }
// }

// function* showSnackbarError(key, reqAction, error) {
//   const { snackbar } = reqAction;
//   const snackbarMessage = getSnackbarField('error', 'message', snackbar);
//   const snackbarSeverity = getSnackbarField('error', 'severity', snackbar);
//   const severity = snackbarSeverity || 'error';

//   const message =
//     snackbarMessage ||
//     getErrorMessage(
//       error.config && error.config.errorLocalizationKey,
//       (error.response && error.response.errorCode) ||
//         (error.response && error.response.status) ||
//         500,
//     );

//   const responseErrorMessage =
//     error.response && error.response.data && error.response.data.message;

//   yield put(
//     actions.enqueueSnackbar(
//       {
//         ...message,
//         values: {
//           message: responseErrorMessage || 'undefined',
//         },
//       },
//       {
//         key,
//         severity,
//       },
//     ),
//   );
// }

// function* showSnackbarSuccess(key, reqAction) {
//   const { snackbar } = reqAction;
//   const snackbarMessage = getSnackbarField('success', 'message', snackbar);
//   const snackbarSeverity = getSnackbarField('success', 'severity', snackbar);
//   const message = snackbarMessage;
//   const severity = snackbarSeverity || 'info';
//   yield put(
//     actions.enqueueSnackbar(message, {
//       key,
//       severity,
//     }),
//   );
// }

// const getSnackbarField = (type, field, snackbar) =>
//   snackbar && snackbar[type] && snackbar[type][field];
