export interface SocketState {
  socket: WebSocket | null;

  socketConnectionLoading: boolean;
  socketConnectionDone: boolean;
  socketConnectionError: null;
}

export interface RootState {
  socket: SocketState;
}
