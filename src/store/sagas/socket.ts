import { AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  socketConnectionError,
  socketConnectionRequest,
  socketConnectionSuccess,
} from '../modules/socket';

function socketConnectionPrmise(): Promise<any> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      const msg = [{ ticket: 'test' }, { type: 'trade', codes: ['KRW-BTC', 'KRW-ETH'] }];
      const msg1 = JSON.stringify(msg);

      ws.send(msg1);

      resolve('connect!');
    };

    ws.onmessage = (event) => {
      const enc = new TextDecoder('utf-8');
      const arr = new Uint8Array(event.data);
      console.log(enc.decode(arr));
    };

    ws.onerror = (error) => {
      reject(error);
    };
  });
}

function* socketConnection() {
  try {
    const result: AxiosResponse<any> = yield call(socketConnectionPrmise);
    yield put(socketConnectionSuccess(result.data));
  } catch (error) {
    yield put(socketConnectionError(error));
  }
}

function* watchSocketConnection() {
  yield takeLatest(socketConnectionRequest, socketConnection);
}

export default function* socketSaga() {
  yield all([fork(watchSocketConnection)]);
}
