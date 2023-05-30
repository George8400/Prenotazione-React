import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReservationDataType } from '../../models/Reservation';

const initialState: ReservationDataType = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  startDate: null,
  endDate: null,
  rooms: [], // roomsBlocked
  categoryRates: [],
  idEvent: 0,
  notes: [],
  numRooms: 0,
  numAdults: 0,
  numChildren: 0,
  ageChildren: 0,
  advancePayment: 0,
  totalRooms: 0,
  totalPrice: 0,
  coupon: '',
  numNights: 0,
  confirmReservation: false, // true quando si va avanti con il tasto prosegui; altrimenti i dati inseriti non sono validi per lo step successivo
  paymentMade: false,
  timer: null,
  expired: false,
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
        ...initialState,
      };
    },
  },
});

export const { setReservation, setReservationReset } = reservationSlice.actions;

export default reservationSlice.reducer;
