import { call, put } from 'redux-saga/effects';
// import checkForSnackbars from './snackbars';

export default function sagaGeneratorFactory(successAction, errorAction) {
  return service =>
    // eslint-disable-next-line func-names
    function*(reqAction) {
      const key = reqAction.key || reqAction.type;
      try {
        if (service) {
          const result = yield call(service, reqAction.payload);
          yield put(successAction(key, result.data));
        } else yield put(successAction(key, {}));
        // yield checkForSnackbars(key, reqAction);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        yield put(errorAction(key, error));
        // yield checkForSnackbars(key, reqAction, error);
      }
    };
}
