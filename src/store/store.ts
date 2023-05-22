import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import checkAvailabilityReducer from './slices/checkAvailability';
import blockRoomsReducer from './slices/blockRooms';
import reservationReducer from './slices/reservation';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const checkAvailabilityPersistedReducer = persistReducer(persistConfig, checkAvailabilityReducer);
const reservationPersistedReducer = persistReducer(persistConfig, reservationReducer);

export const store = configureStore({
  reducer: {
    checkAvailability: checkAvailabilityPersistedReducer,
    blockRooms: blockRoomsReducer,
    // reservation: reservationReducer,
    reservation: reservationPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(thunk),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
