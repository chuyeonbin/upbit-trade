import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, all, takeEvery } from 'redux-saga/effects';
import { getMarketCodes, getOrderBooks, getPresentPrice, getTrades } from '../../api';
import { MarketCodes, Orderbooks, PresentPrices, Trades } from '../../types';

import {
  changeSelectedCoin,
  changeSelectedMarketName,
  loadMarketListFailure,
  loadMarketListRequest,
  loadMarketListSuccess,
  loadOrderbookFailure,
  loadOrderbookRequest,
  loadOrderbookSuccess,
  loadSelectedCoinDataFailure,
  loadSelectedCoinDataRequest,
  loadSelectedCoinDataSuccess,
  loadTickerListFailure,
  loadTickerListRequest,
  loadTickerListSuccess,
  loadTradeListFailure,
  loadTradeListRequest,
  loadTradeListSuccess,
} from '../modules/coin';

export function* loadMarketList() {
  yield put(loadMarketListRequest());
  try {
    const marketList: MarketCodes = yield call(getMarketCodes);
    yield put(loadMarketListSuccess(marketList));
  } catch (error) {
    yield put(loadMarketListFailure({ error }));
    console.error(error);
  }
}

export function* loadSelectedCoinDataSaga(code: string) {
  yield put(loadSelectedCoinDataRequest());
  try {
    const coin: PresentPrices = yield call(getPresentPrice, [code]);

    yield put(loadSelectedCoinDataSuccess(coin));
  } catch (error) {
    yield put(loadSelectedCoinDataFailure({ error }));
    console.error(error);
  }
}

export function* loadTickerList(markets: string[]) {
  yield put(loadTickerListRequest());
  try {
    const tickerList: PresentPrices = yield call(getPresentPrice, markets);
    yield put(loadTickerListSuccess(tickerList));
  } catch (error) {
    yield put(loadTickerListFailure({ error }));
    console.error(error);
  }
}

export function* loadTradeListSaga(code: string) {
  yield put(loadTradeListRequest());
  try {
    const trades: Trades = yield call(getTrades, code);
    yield put(loadTradeListSuccess(trades));
  } catch (error) {
    yield put(loadTradeListFailure({ error }));
    console.error(error);
  }
}

export function* loadOrderbookSaga(codes: string[]) {
  yield put(loadOrderbookRequest());
  try {
    const orderbooks: Orderbooks = yield call(getOrderBooks, codes);
    yield put(loadOrderbookSuccess(orderbooks));
  } catch (error) {
    yield put(loadOrderbookFailure({ error }));
    console.error(error);
  }
}

function* changeSelectedCoinSaga({ payload }: PayloadAction<{ marketName: string; code: string }>) {
  yield loadSelectedCoinDataSaga(payload.code);
  yield loadTradeListSaga(payload.code);
  yield loadOrderbookSaga([payload.code]);
  yield put(changeSelectedMarketName({ marketName: payload.marketName }));
}

function* watchChangeSelectedCoinSaga() {
  yield takeEvery(changeSelectedCoin, changeSelectedCoinSaga);
}

export default function* coinSaga() {
  yield all([fork(watchChangeSelectedCoinSaga)]);
}
