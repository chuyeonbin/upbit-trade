import { all, fork } from 'redux-saga/effects';
import coinSaga from './coin';
import socketSaga from './socket';

export default function* rootSaga() {
  yield all([fork(socketSaga), fork(coinSaga)]);
}
