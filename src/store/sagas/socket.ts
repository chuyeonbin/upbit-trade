import { PayloadAction } from '@reduxjs/toolkit';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { createSocket } from '../../utils/socket';
import { presentPriceSocketFailure, presentPriceSocketRequest } from '../modules/socket';

function channelConnection(): EventChannel<string> {
  return eventChannel((emitter) => {
    const ws = createSocket();

    ws.onopen = () => {
      const msg = JSON.stringify([{ ticket: 'upbit' }, { type: 'trade', codes: ['KRW-BTC'] }]);

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

function* socketConnection({ payload }: PayloadAction<any>) {
  console.log(payload);
  let channel: EventChannel<string>;
  try {
    channel = yield call(channelConnection);
    while (true) {
      const msg: string = yield take(channel);
      console.log(msg);
    }
  } catch (error) {
    console.error(error);
    yield put(presentPriceSocketFailure(error));
  } finally {
    closeChannel(channel!);
  }
}

function* watchPresentPriceSocket() {
  yield takeEvery(presentPriceSocketRequest, socketConnection);
}

export default function* socketSaga() {
  yield all([fork(watchPresentPriceSocket)]);
}
