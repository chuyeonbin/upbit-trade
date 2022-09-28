import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketState } from '../../types/state';

const initialState: SocketState = {
  socketConnectionLoading: false,
  socketConnectionSuccess: false,
  socketConnectionError: null,
};

const socketSlice = createSlice({
  initialState,
  name: 'socket',
  reducers: {
    socketConnectionRequest: (state) => {
      state.socketConnectionLoading = true;
      state.socketConnectionSuccess = false;
      state.socketConnectionError = null;
    },
    socketConnectionSuccess: (state) => {
      state.socketConnectionLoading = false;
      state.socketConnectionSuccess = true;
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
