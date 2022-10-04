import { createSlice } from '@reduxjs/toolkit';
import { SocketState } from '../../types/state';

const initialState: SocketState = {
  presentPriceSocketLoading: false,
  presentPriceSocketDone: false,
  presentPriceSocketError: null,
};

const socketSlice = createSlice({
  initialState,
  name: 'socket',
  reducers: {
    presentPriceSocketRequest: (state) => {
      state.presentPriceSocketLoading = true;
      state.presentPriceSocketDone = false;
      state.presentPriceSocketError = null;
    },
    presentPriceSocketSuccess: (state) => {
      state.presentPriceSocketLoading = false;
      state.presentPriceSocketDone = true;
    },
    presentPriceSocketFailure: (state, { payload }) => {
      state.presentPriceSocketLoading = false;
      state.presentPriceSocketError = payload.error;
    },
  },
});

export const { presentPriceSocketRequest, presentPriceSocketSuccess, presentPriceSocketFailure } =
  socketSlice.actions;

export default socketSlice.reducer;
