import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  PayloadAction,
} from '@reduxjs/toolkit';
import { buffers, END, EventChannel, eventChannel } from 'redux-saga';
import { all, call, delay, fork, put, takeEvery, flush, select } from 'redux-saga/effects';
import { RealTimeTickers } from '../../types/realTime';
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

function closeChannel(channel: EventChannel<string> | null) {
  if (channel) {
    channel.close();
  }
}

export function* socketConnection(
  field: {
    type: 'ticker' | 'trade' | 'orderbook';
    codes: string[];
  },
  action: {
    success: ActionCreatorWithoutPayload<string>;
    failure: ActionCreatorWithPayload<any, string>;
  },
) {
  let channel: EventChannel<string>;
  try {
    channel = yield call(channelConnection, field);
    yield put(action.success());

    const {
      coin: { selectedCoin },
    }: RootState = yield select();

    while (true) {
      const msg: RealTimeTickers = yield flush(channel);

      if (msg.length) {
        yield put(updateTickerList(msg));
      }

      if (msg.find((value) => value.code === selectedCoin.code)) {
        yield put(updateSelectedCoin(msg));
      }

      yield delay(500); // 0.5초마다 업데이트
    }
  } catch (error) {
    console.error(error);
    yield put(action.failure(error));
  } finally {
    closeChannel(channel!);
  }
}

export function* presentPriceSocketSaga({ payload }: PayloadAction<string[]>) {
  yield socketConnection(
    { type: 'ticker', codes: payload },
    {
      success: presentPriceSocketSuccess,
      failure: presentPriceSocketFailure,
    },
  );
}

export function* tradeSocketSaga({ payload }: PayloadAction<string[]>) {
  yield socketConnection(
    { type: 'trade', codes: payload },
    {
      success: tradeSocketSuccess,
      failure: tradeSocketFailure,
    },
  );
}

function* orderbookSocketSaga({ payload }: PayloadAction<string[]>) {
  yield socketConnection(
    { type: 'orderbook', codes: payload },
    {
      success: orderbookSocketSuccess,
      failure: orderbookSocketFailure,
    },
  );
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
