import { PayloadAction } from '@reduxjs/toolkit';
import { buffers, END, EventChannel, eventChannel } from 'redux-saga';
import { all, call, delay, fork, put, takeEvery, flush, select } from 'redux-saga/effects';
import { RealTimeOrderbooks, RealTimeTickers, RealTimeTrades } from '../../types/realTime';
import RootState from '../../types/state';
import { createSocket } from '../../utils';
import { updateSelectedCoin, updateTickerList } from '../modules/coin';
import {
  presentPriceSocketSuccess,
  presentPriceSocketFailure,
  presentPriceSocketRequest,
  tradeSocketRequest,
  tradeSocketSuccess,
  tradeSocketFailure,
  orderbookSocketRequest,
  orderbookSocketSuccess,
  orderbookSocketFailure,
} from '../modules/socket';

function channelConnection(field: {
  type: 'ticker' | 'trade' | 'orderbook';
  codes: string[];
}): EventChannel<string> {
  return eventChannel((emitter) => {
    const ws = createSocket();

    ws.onopen = () => {
      const msg = JSON.stringify([{ ticket: 'upbit' }, field]);
      ws.send(msg);
    };

    ws.onmessage = (event) => {
      const enc = new TextDecoder('utf-8');
      const arr = new Uint8Array(event.data);
      emitter(JSON.parse(enc.decode(arr)));
    };

    ws.onerror = (error) => {
      throw error;
    };

    ws.close = () => {
      emitter(END);
    };

    return function unsubscribe() {
      ws.close();
    };
  }, buffers.expanding(200) || buffers.none());
}

function closeChannel(
  channel: EventChannel<RealTimeTickers | RealTimeTrades | RealTimeOrderbooks> | null,
) {
  if (channel) {
    channel.close();
  }
}

export function* presentPriceSocketSaga({ payload }: PayloadAction<{ codes: string[] }>) {
  let channel: EventChannel<RealTimeTickers>;
  try {
    channel = yield call(channelConnection, { type: 'ticker', codes: payload.codes });
    yield put(presentPriceSocketSuccess());

    while (true) {
      const msg: RealTimeTickers = yield flush(channel);
      const {
        coin: { selectedCoin },
      }: RootState = yield select();

      if (msg.length) {
        console.log(msg);
        yield put(updateTickerList(msg));
      }

      if (msg.find((value) => value.code === selectedCoin.code)) {
        yield put(updateSelectedCoin(msg));
      }

      yield delay(500); // 0.5초마다 업데이트
    }
  } catch (error) {
    console.error(error);
    yield put(presentPriceSocketFailure(error));
  } finally {
    closeChannel(channel!);
  }
}

export function* tradeSocketSaga({ payload }: PayloadAction<{ codes: string[] }>) {
  let channel: EventChannel<RealTimeTrades>;
  try {
    channel = yield call(channelConnection, { type: 'trade', codes: payload.codes });
    yield put(tradeSocketSuccess());

    while (true) {
      const msg: RealTimeTrades = yield flush(channel);

      if (msg.length) {
        console.log(msg);
      }
      yield delay(500); // 0.5초마다 업데이트
    }
  } catch (error) {
    console.error(error);
    yield put(tradeSocketFailure(error));
  } finally {
    closeChannel(channel!);
  }
}

export function* orderbookSocketSaga({ payload }: PayloadAction<{ codes: string[] }>) {
  let channel: EventChannel<RealTimeOrderbooks>;
  try {
    channel = yield call(channelConnection, { type: 'orderbook', codes: payload.codes });
    yield put(orderbookSocketSuccess());

    while (true) {
      const msg: RealTimeOrderbooks = yield flush(channel);

      if (msg.length) {
        console.log(msg);
      }
      yield delay(500); // 0.5초마다 업데이트
    }
  } catch (error) {
    console.error(error);
    yield put(orderbookSocketFailure(error));
  } finally {
    closeChannel(channel!);
  }
}

function* watchPresentPriceSocketSaga() {
  yield takeEvery(presentPriceSocketRequest, presentPriceSocketSaga);
}

function* watchTradeSocketSaga() {
  yield takeEvery(tradeSocketRequest, tradeSocketSaga);
}

function* watchOrderbookSocketSaga() {
  yield takeEvery(orderbookSocketRequest, orderbookSocketSaga);
}

export default function* socketSaga() {
  yield all([
    fork(watchPresentPriceSocketSaga),
    fork(watchTradeSocketSaga),
    fork(watchOrderbookSocketSaga),
  ]);
}
