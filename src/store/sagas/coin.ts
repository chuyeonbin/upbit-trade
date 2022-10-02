import { all, call, fork, put, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getMarketCodes } from '../../api';
import {
  loadMarketListFailure,
  loadMarketListRequest,
  loadMarketListSuccess,
} from '../modules/coin';

function* loadMarketList() {
  try {
    const marketList: SagaReturnType<typeof getMarketCodes> = yield call(getMarketCodes);
    yield put(loadMarketListSuccess(marketList));
  } catch (error) {
    yield put(loadMarketListFailure({ error }));
    console.error(error);
  }
}

function* watchLoadMarketList() {
  yield takeLatest(loadMarketListRequest, loadMarketList);
}

export default function* coinSaga() {
  yield all([fork(watchLoadMarketList)]);
}
