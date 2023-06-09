import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import checkAvailabilityReducer from './slices/checkAvailability';
import resultsCheckAvailabilityReducer from './slices/resultsCheckAvailability';
import blockRoomsReducer from './slices/blockRooms';
import reservationReducer from './slices/reservation';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';

const persistCheckAvailabilityConfig = {
  key: 'checkAvailability',
  storage,
};

const persistReservationConfig = {
  key: 'reservation',
  storage,
};

const persistResultsCheckAvailabilityConfig = {
  key: 'resultsCheckAvailability',
  storage,
};

const persistBlockRoomsConfig = {
  key: 'blockRooms',
  storage,
};

const checkAvailabilityPersistedReducer = persistReducer(persistCheckAvailabilityConfig, checkAvailabilityReducer);
const reservationPersistedReducer = persistReducer(persistReservationConfig, reservationReducer);
const resultsCheckAvailabilityPersistedReducer = persistReducer(
  persistResultsCheckAvailabilityConfig,
  resultsCheckAvailabilityReducer,
);

const blockRoomsPersistedReducer = persistReducer(persistBlockRoomsConfig, blockRoomsReducer);

export const store = configureStore({
  reducer: {
    checkAvailability: checkAvailabilityPersistedReducer,
    blockRooms: blockRoomsPersistedReducer,
    reservation: reservationPersistedReducer,
    resultsCheckAvailability: resultsCheckAvailabilityPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(thunk),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
