import { call, put } from 'redux-saga/effects';
import checkForSnackbars from './snackbars';

export default function sagaGeneratorFactory(successAction, errorAction) {
  return service =>
    // eslint-disable-next-line func-names
    function*(reqAction) {
      const key = reqAction.key || reqAction.type;
      try {
        const result = yield call(service, reqAction.payload);
        yield put(successAction(key, result.data));
        yield checkForSnackbars(key, reqAction);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.response.data);
        yield put(errorAction(key, error.response.data));
        yield checkForSnackbars(key, reqAction, error);
      }
    };
}
