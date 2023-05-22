import { configureStore } from '@reduxjs/toolkit';
import checkAvailabilityReducer from './slices/checkAvailability';
import blockRoomsReducer from './slices/blockRooms';
import reservationReducer from './slices/reservation';

export const store = configureStore({
  reducer: {
    checkAvailability: checkAvailabilityReducer,
    blockRooms: blockRoomsReducer,
    reservation: reservationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
