import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketState } from '../../types/state';

const initialState: SocketState = {
  socket: null,

  socketConnectionLoading: false,
  socketConnectionDone: false,
  socketConnectionError: null,
};

const socketSlice = createSlice({
  initialState,
  name: 'socket',
  reducers: {
    socketConnectionRequest: (state) => {
      state.socketConnectionLoading = true;
    },
    socketConnectionSuccess: (state, { payload }: PayloadAction<any>) => {
      console.log(payload);
    },
    socketConnectionError: (state, { payload }: PayloadAction<any>) => {
      state.socketConnectionLoading = false;
      state.socketConnectionError = payload;
    },
  },
});

export const { socketConnectionRequest, socketConnectionSuccess, socketConnectionError } =
  socketSlice.actions;

export default socketSlice.reducer;
