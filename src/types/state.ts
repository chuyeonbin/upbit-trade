export interface SocketState {
  socket: WebSocket | null;
}

export interface RootState {
  socket: SocketState;
}
