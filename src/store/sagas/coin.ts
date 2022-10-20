import { call, put } from 'redux-saga/effects';
import { getMarketCodes, getPresentPrice } from '../../api';
import { MarketCodes, PresentPrices } from '../../types';
import {
  loadMarketListFailure,
  loadMarketListRequest,
  loadMarketListSuccess,
  loadTickerListFailure,
  loadTickerListRequest,
  loadTickerListSuccess,
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
