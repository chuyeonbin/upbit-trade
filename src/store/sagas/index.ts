import { all, fork, put, select, takeEvery } from 'redux-saga/effects';
import {
  orderbookSocketRequest,
  presentPriceSocketRequest,
  tradeSocketRequest,
} from '../modules/socket';
import { startInit } from '../modules/start';
import { RootState } from '../store';
import coinSaga, { loadMarketList, loadSelectedCoinDataSaga, loadTickerList } from './coin';
import socketSaga from './socket';

function* initSaga() {
  yield loadMarketList();

  const { coin }: RootState = yield select();

  const markets = coin.marketList.map((value) => value.code);

  yield loadTickerList(markets);
  yield loadSelectedCoinDataSaga(coin.selectedCoin.code);

  yield put(presentPriceSocketRequest(markets)); // 현재가 소켓 연결 요청

  // yield put(tradeSocketRequest(['KRW-BTC'])); // 체결가 소켓 연결 요청
  // yield put(orderbookSocketRequest(['KRW-BTC.10'])); // 호가 소켓 연결 요청
}

function* watchStart() {
  yield takeEvery(startInit, initSaga);
}

export default function* rootSaga() {
  yield all([fork(watchStart), fork(socketSaga), fork(coinSaga)]);
}
