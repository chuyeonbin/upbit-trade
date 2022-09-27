import { END, EventChannel, eventChannel } from 'redux-saga';
import { all, call, fork, take, takeEvery } from 'redux-saga/effects';
import { createSocket } from '../../utils/socket';
import { socketConnectionRequest } from '../modules';

function channelConnection(): EventChannel<any> {
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

function* socketConnection() {
  const channel: EventChannel<any> = yield call(channelConnection);

  try {
    while (true) {
      const msg: string = yield take(channel);
      console.log(msg);
    }
  } catch (error) {
    console.error(error);
    channel.close();
  }
}

function* watchSocketConnection() {
  yield takeEvery(socketConnectionRequest, socketConnection);
}

export default function* socketSaga() {
  yield all([fork(watchSocketConnection)]);
}
