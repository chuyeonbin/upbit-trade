import { PayloadAction } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';
import { call, fork, put, all, takeEvery, select, throttle } from 'redux-saga/effects';
import {
  getCandleByMinutes,
  getCandleByData,
  getMarketCodes,
  getOrderBooks,
  getPresentPrice,
  getTrades,
} from '../../api';
import { CandleType, MarketCodes, Orderbooks, PresentPrices, Trades } from '../../types';
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
  loadPrevCandleData,
  loadPrevCandleDataFailure,
  loadPrevCandleDataRequest,
  loadPrevCandleDataSuccess,
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
  const date = new Date().toISOString();
  try {
    const candles: DayCandles = yield call(getCandleByData, code, 'days', date);
    yield put(loadCandleDataSuccess(candles));
  } catch (error) {
    yield put(loadCandleDataFailure({ error }));
  }
}

export function* loadPrevCandleDataSaga() {
  yield put(loadPrevCandleDataRequest());
  const { coin }: RootState = yield select();
  const date = parseISO(coin.candles.datas[0].dateTimeKst).toISOString();
  try {
    let candles: DayCandles | WeekCandles | MonthCandles | MinuteCandles;
    switch (coin.candles.candleType) {
      case 'days':
        candles = yield call(getCandleByData<DayCandles>, coin.selectedCoin.code, 'days', date);
        break;
      case 'weeks':
        candles = yield call(getCandleByData<WeekCandles>, coin.selectedCoin.code, 'weeks', date);
        break;
      case 'months':
        candles = yield call(getCandleByData<MonthCandles>, coin.selectedCoin.code, 'months', date);
        break;
      case '1minutes':
        candles = yield call(getCandleByMinutes, coin.selectedCoin.code, 1, date);
        break;
      case '5minutes':
        candles = yield call(getCandleByMinutes, coin.selectedCoin.code, 5, date);
        break;
      case '10minutes':
        candles = yield call(getCandleByMinutes, coin.selectedCoin.code, 10, date);
        break;
      default:
        throw new Error('알수 없는 타입입니다.' + coin.candles.candleType);
    }
    yield put(loadPrevCandleDataSuccess(candles));
  } catch (error) {
    yield put(loadPrevCandleDataFailure({ error }));
  }
}

export function* changeCandleDataSaga({ payload }: PayloadAction<{ type: CandleType }>) {
  yield put(loadCandleDataRequest());
  const { coin }: RootState = yield select();
  const date = new Date().toISOString();
  try {
    let candles: DayCandles | WeekCandles | MonthCandles | MinuteCandles;
    switch (payload.type) {
      case 'days':
        candles = yield call(getCandleByData<DayCandles>, coin.selectedCoin.code, 'days', date);
        break;
      case 'weeks':
        candles = yield call(getCandleByData<WeekCandles>, coin.selectedCoin.code, 'weeks', date);
        break;
      case 'months':
        candles = yield call(getCandleByData<MonthCandles>, coin.selectedCoin.code, 'months', date);
        break;
      case '1minutes':
        candles = yield call(getCandleByMinutes, coin.selectedCoin.code, 1, date);
        break;
      case '5minutes':
        candles = yield call(getCandleByMinutes, coin.selectedCoin.code, 5, date);
        break;
      case '10minutes':
        candles = yield call(getCandleByMinutes, coin.selectedCoin.code, 10, date);
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
  yield all([
    loadSelectedCoinDataSaga(payload.code),
    loadTradeListSaga(payload.code),
    loadOrderbookSaga([payload.code]),
    loadCandleDataSaga(payload.code),
  ]);
  yield put(changeSelectedMarketName({ marketName: payload.marketName }));
}

function* watchPrevCandleDataSaga() {
  yield throttle(500, loadPrevCandleData, loadPrevCandleDataSaga);
}

function* watchChangeCandleDataSaga() {
  yield takeEvery(changeCandleData, changeCandleDataSaga);
}

function* watchChangeSelectedCoinSaga() {
  yield takeEvery(changeSelectedCoin, changeSelectedCoinSaga);
}

export default function* coinSaga() {
  yield all([
    fork(watchChangeSelectedCoinSaga),
    fork(watchChangeCandleDataSaga),
    fork(watchPrevCandleDataSaga),
  ]);
}
