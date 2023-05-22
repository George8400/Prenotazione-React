import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReservationDataType } from '../../models/Reservation';

const initialState: ReservationDataType | null = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  startDate: '',
  endDate: '',
  rooms: [], // roomsBlocked
  categoryRates: [],
  idEvent: '',
  notes: [],
  numRooms: 0,
  numAdults: 0,
  numChildren: 0,
  ageChildren: 0,
  advancePayment: 0,
};

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: initialState,
  reducers: {
    setReservation: (state, action: PayloadAction<Partial<ReservationDataType>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    setReservationReset: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const { setReservation, setReservationReset } = reservationSlice.actions;

export default reservationSlice.reducer;
