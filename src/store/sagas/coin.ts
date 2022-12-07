import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, all, takeEvery, select } from 'redux-saga/effects';
import {
  getCandleByDays,
  getCandleByMinutes,
  getCandleByMonths,
  getCandleByWeeks,
  getMarketCodes,
  getOrderBooks,
  getPresentPrice,
  getTrades,
} from '../../api';
import { MarketCodes, Orderbooks, PresentPrices, Trades } from '../../types';
import { DayCandles, MinuteCandles, MonthCandles, WeekCandles } from '../../types/candle';

import {
  changeCandleData,
  changeSelectedCoin,
  changeSelectedMarketName,
  loadCandleDataFailure,
  loadCandleDataRequest,
  loadCandleDataSuccess,
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
import { RootState } from '../store';

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

export function* loadCandleDataSaga(code: string) {
  yield put(loadCandleDataRequest());
  try {
    const candles: DayCandles = yield call(getCandleByDays, code);
    yield put(loadCandleDataSuccess(candles));
  } catch (error) {
    yield put(loadCandleDataFailure({ error }));
  }
}

export function* changeCandleDataSaga({
  payload,
}: PayloadAction<{ type: '일봉' | '주봉' | '월봉' | '1분봉' | '5분봉' | '10분봉' }>) {
  yield put(loadCandleDataRequest());
  const { coin }: RootState = yield select();
  try {
    let candles: DayCandles | WeekCandles | MonthCandles | MinuteCandles;
    switch (payload.type) {
      case '일봉':
        candles = yield call(getCandleByDays, coin.selectedCoin.code);
        break;
      case '주봉':
        candles = yield call(getCandleByWeeks, coin.selectedCoin.code);
        break;
      case '월봉':
        candles = yield call(getCandleByMonths, coin.selectedCoin.code);
        break;
      case '1분봉':
        candles = yield call(getCandleByMinutes, coin.selectedCoin.code, 1);
        break;
      case '5분봉':
        candles = yield call(getCandleByMinutes, coin.selectedCoin.code, 5);
        break;
      case '10분봉':
        candles = yield call(getCandleByMinutes, coin.selectedCoin.code, 10);
        break;
      default:
        throw new Error('알수 없는 타입입니다.' + payload.type);
    }
    yield put(loadCandleDataSuccess(candles));
  } catch (error) {
    yield put(loadCandleDataFailure({ error }));
  }
}

function* changeSelectedCoinSaga({ payload }: PayloadAction<{ marketName: string; code: string }>) {
  yield loadSelectedCoinDataSaga(payload.code);
  yield loadTradeListSaga(payload.code);
  yield loadOrderbookSaga([payload.code]);
  yield loadCandleDataSaga(payload.code);
  yield put(changeSelectedMarketName({ marketName: payload.marketName }));
}

function* watchChangeCandleDataSaga() {
  yield takeEvery(changeCandleData, changeCandleDataSaga);
}

function* watchChangeSelectedCoinSaga() {
  yield takeEvery(changeSelectedCoin, changeSelectedCoinSaga);
}

export default function* coinSaga() {
  yield all([fork(watchChangeSelectedCoinSaga), fork(watchChangeCandleDataSaga)]);
}
