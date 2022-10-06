import { call, put, SagaReturnType } from 'redux-saga/effects';
import { getMarketCodes } from '../../api';
import {
  loadMarketListFailure,
  loadMarketListRequest,
  loadMarketListSuccess,
} from '../modules/coin';

export function* loadMarketList() {
  yield put(loadMarketListRequest());
  try {
    const marketList: SagaReturnType<typeof getMarketCodes> = yield call(getMarketCodes);
    yield put(loadMarketListSuccess(marketList));
  } catch (error) {
    yield put(loadMarketListFailure({ error }));
    console.error(error);
  }
}
