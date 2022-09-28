export interface SocketState {
  socketConnectionLoading: boolean;
  socketConnectionSuccess: boolean;
  socketConnectionError: Error | null;
}

export default interface RootState {
  socket: SocketState;
}
