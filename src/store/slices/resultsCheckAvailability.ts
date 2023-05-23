import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReservationDataType } from '../../models/Reservation';
import { CheckAvailabilityResponseType } from '../../models/apiData/CategoryRate';

interface ResultsCheckAvailabilityState extends CheckAvailabilityResponseType {
  isLoading: boolean;
}

const initialState: ResultsCheckAvailabilityState = {
  isLoading: false,
  coupon: {
    message: '',
    valoreCoupon: '',
  },
  listaCategorie: [],
};

export const resultsCheckAvailabilitySlice = createSlice({
  name: 'resultsCheckAvailability',
  initialState: initialState,
  reducers: {
    setResultsCheckAvailabilityLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },

    setResultsCheckAvailability: (state, action: PayloadAction<CheckAvailabilityResponseType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setResultsCheckAvailability } = resultsCheckAvailabilitySlice.actions;

export default resultsCheckAvailabilitySlice.reducer;
