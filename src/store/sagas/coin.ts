import { all, call, fork, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { getMarketCodes } from '../../api';
import { loadMarketListError, loadMarketListRequest, loadMarketListSuccess } from '../modules/coin';

function* loadMarketList() {
  try {
    const marketList: SagaReturnType<typeof getMarketCodes> = yield call(getMarketCodes);
    put(loadMarketListSuccess(marketList));
  } catch (error) {
    put(loadMarketListError({ error }));
    console.error(error);
  }
}

function* watchLoadMarketList() {
  yield takeEvery(loadMarketListRequest, loadMarketList);
}

export default function* coinSaga() {
  yield all([fork(watchLoadMarketList)]);
}
