import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckAvailabilityDataType } from '../../models/Reservation';

const initialState: CheckAvailabilityDataType = {
  startDate: '',
  endDate: '',
  numAdults: 0,
  numChildren: 0,
  numRooms: 0,
  coupon: '',
};

export const checkAvailabilitySlice = createSlice({
  name: 'checkAvailability',
  initialState: initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setNumAdults: (state, action: PayloadAction<number>) => {
      state.numAdults = action.payload;
    },
    setNumChildren: (state, action: PayloadAction<number>) => {
      state.numChildren = action.payload;
    },
    setNumRooms: (state, action: PayloadAction<number>) => {
      state.numRooms = action.payload;
    },
    setCoupon: (state, action: PayloadAction<string>) => {
      state.coupon = action.payload;
    },
    setCheckAvailability: (state, action: PayloadAction<CheckAvailabilityDataType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    setCheckAvailabilityReset: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  setNumAdults,
  setNumChildren,
  setNumRooms,
  setCoupon,
  setCheckAvailability,
  setCheckAvailabilityReset,
} = checkAvailabilitySlice.actions;

export default checkAvailabilitySlice.reducer;
