export function createSocket(): WebSocket {
  const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
  ws.binaryType = 'arraybuffer';

  return ws;
}
