import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import checkAvailabilityReducer from './slices/checkAvailability';
import blockRoomsReducer from './slices/blockRooms';
import reservationReducer from './slices/reservation';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage,
};

const checkAvailabilityPersistedReducer = persistReducer(persistConfig, checkAvailabilityReducer);

export const store = configureStore({
  reducer: {
    checkAvailability: checkAvailabilityPersistedReducer,
    blockRooms: blockRoomsReducer,
    reservation: reservationReducer,
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
