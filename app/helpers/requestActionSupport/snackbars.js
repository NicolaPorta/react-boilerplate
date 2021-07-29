import { put } from 'redux-saga/effects';
import { actions } from '@spindox/siae-snackbar-notistack';

export default function* checkForSnackbars(key, reqAction, error) {
  if (error) {
    yield showSnackbarError(key, reqAction, error);
  } else {
    yield showSnackbarSuccess(key, reqAction);
  }
}

function* showSnackbarError(key, reqAction, error) {
  const message = error;

  const responseErrorMessage =
    error.response && error.response.data && error.response.data.message;

  yield put(
    actions.enqueueSnackbar(
      {
        ...message,
        values: {
          message: responseErrorMessage || 'undefined',
        },
      },
      {
        key,
      },
    ),
  );
}

function* showSnackbarSuccess(key, reqAction) {
  console.log(reqAction);
  const { message } = reqAction;
  yield put(
    actions.enqueueSnackbar(message, {
      key,
    }),
  );
}
