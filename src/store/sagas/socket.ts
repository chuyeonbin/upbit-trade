import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  PayloadAction,
} from '@reduxjs/toolkit';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { createSocket } from '../../utils/socket';
import {
  presentPriceSocketSuccess,
  presentPriceSocketFailure,
  presentPriceSocketRequest,
  tradeSocketRequest,
  tradeSocketSuccess,
  tradeSocketFailure,
} from '../modules/socket';

function channelConnection(field: {
  type: 'ticker' | 'trade' | 'orderbook';
  codes: string[];
}): EventChannel<string> {
  return eventChannel((emitter) => {
    const ws = createSocket();

    ws.onopen = () => {
      const msg = JSON.stringify([{ ticket: 'upbit' }, { type: field.type, codes: ['KRW-BTC'] }]);

      ws.send(msg);
    };

    ws.onmessage = (event) => {
      const enc = new TextDecoder('utf-8');
      const arr = new Uint8Array(event.data);
      emitter(enc.decode(arr));
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
  });
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
    while (true) {
      const msg: string = yield take(channel);
      console.log(msg);
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
  console.log('tradeSaga');
  yield socketConnection(
    { type: 'trade', codes: payload },
    {
      success: tradeSocketSuccess,
      failure: tradeSocketFailure,
    },
  );
}

function* watchPresentPriceSocketSaga() {
  yield takeEvery(presentPriceSocketRequest, presentPriceSocketSaga);
}

function* watchTradeSocketSaga() {
  yield takeEvery(tradeSocketRequest, tradeSocketSaga);
}

export default function* socketSaga() {
  yield all([fork(watchPresentPriceSocketSaga), fork(watchTradeSocketSaga)]);
}
