import { createSlice } from '@reduxjs/toolkit';
import { SocketState } from '../../types/state';

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  initialState,
  name: 'socket',
  reducers: {
    socketConnectionRequest: (state) => {
      console.log('socketConnection');
    },
  },
});

export const { socketConnectionRequest } = socketSlice.actions;

export default socketSlice.reducer;
