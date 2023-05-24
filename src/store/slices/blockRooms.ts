import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlockRoomsDataType } from '../../models/Reservation';

interface BlockRoomsState {
  rooms: string[];
}

const initialState: BlockRoomsState = {
  rooms: [],
};

export const blockRoomsSlice = createSlice({
  name: 'blockRooms',
  initialState: initialState,
  reducers: {
    setBlockRooms: (state, action: PayloadAction<string[]>) => {
      state.rooms = action.payload;
    },
    setBlockRoomsReset: (state) => {
      state.rooms = initialState.rooms;
    },
  },
});

export const { setBlockRooms, setBlockRoomsReset } = blockRoomsSlice.actions;

export default blockRoomsSlice.reducer;
