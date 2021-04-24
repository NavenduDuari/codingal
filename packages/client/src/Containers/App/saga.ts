import { takeLatest } from 'redux-saga/effects';
import { ActionTypes } from './types';
import { Action } from '../../types';

function test() {
  return function* (action: Action<ActionTypes>) {
    try {
      console.log(action);
    } catch (err) {
      console.error(err);
    }
  };
}

export default function* appSaga() {
  yield takeLatest(ActionTypes.TEST_ACTION, test());
}
