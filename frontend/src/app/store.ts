import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import characterReducer from '../shared/stores';
import authReducer from '../features/auth/stores/authSlice';


const characterPersistConfig = {
  key: 'character',
  version: 1,
  storage
};

const persistedCharacterReducer = persistReducer(characterPersistConfig, characterReducer);


export const store = configureStore({
  reducer: {
    character: persistedCharacterReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});



export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;