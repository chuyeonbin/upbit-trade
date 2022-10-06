import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { createSocket } from '../../utils/socket';

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
    request: ActionCreatorWithoutPayload<string>;
    success: ActionCreatorWithoutPayload<string>;
    failure: ActionCreatorWithPayload<any, string>;
  },
) {
  let channel: EventChannel<string>;
  try {
    yield put(action.request());
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
