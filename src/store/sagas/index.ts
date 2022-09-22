import { all, fork } from 'redux-saga/effects';
import socketSaga from './socket';

export default function* rootSaga() {
  yield all([fork(socketSaga)]);
}
