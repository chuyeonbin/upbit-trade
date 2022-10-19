import { call, put } from 'redux-saga/effects';
import { getMarketCodes } from '../../api';
import { MarketCodes } from '../../types';
import {
  loadMarketListFailure,
  loadMarketListRequest,
  loadMarketListSuccess,
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
