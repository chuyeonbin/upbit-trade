import { all, fork, put, select, takeEvery } from 'redux-saga/effects';
import { presentPriceSocketRequest, tradeSocketRequest } from '../modules/socket';
import { startInit } from '../modules/start';
import { RootState } from '../store';
import { loadMarketList } from './coin';
import socketSaga from './socket';

function* initSaga() {
  yield loadMarketList();

  const { coin }: RootState = yield select();

  const codes = coin.marketList.map((value) => value.market);

  yield put(presentPriceSocketRequest(codes)); // 현재가 소켓 연결 요청
  yield put(tradeSocketRequest(['KRW-BTC'])); // 체결가 소켓 연결 요청
}

function* watchStart() {
  yield takeEvery(startInit, initSaga);
}

export default function* rootSaga() {
  yield all([fork(watchStart), fork(socketSaga)]);
}
