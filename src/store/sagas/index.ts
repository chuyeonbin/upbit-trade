import { all, fork, select, takeEvery } from 'redux-saga/effects';
import { startInit } from '../modules/start';
import { RootState } from '../store';
import { loadMarketList } from './coin';
import { presentPriceSocketSaga } from './socket';

function* initSaga() {
  yield loadMarketList();

  const { coin }: RootState = yield select();

  const codes = coin.marketList.map((value) => value.market);

  yield presentPriceSocketSaga(codes); // 현재가 소켓 연결
}

function* watchStart() {
  yield takeEvery(startInit, initSaga);
}

export default function* rootSaga() {
  yield all([fork(watchStart)]);
}
