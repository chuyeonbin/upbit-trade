import { createSlice } from '@reduxjs/toolkit';
import { SocketState } from '../../types/state';

const initialState: SocketState = {
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
      state.socketConnectionDone = false;
      state.socketConnectionError = null;
    },
    socketConnectionSuccess: (state) => {
      state.socketConnectionLoading = false;
      state.socketConnectionDone = true;
      console.log('socket Connect!');
    },
    socketConnectionError: (state, { payload }) => {
      state.socketConnectionLoading = false;
      state.socketConnectionError = payload.error;
    },
  },
});

export const { socketConnectionRequest, socketConnectionSuccess, socketConnectionError } =
  socketSlice.actions;

export default socketSlice.reducer;
