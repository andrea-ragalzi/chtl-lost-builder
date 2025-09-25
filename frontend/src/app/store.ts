import { configureStore } from '@reduxjs/toolkit';
import characterReducer from '../shared/stores';
import authReducer from '../features/auth/stores/authSlice'; // Import the auth reducer

export const store = configureStore({
  reducer: {
    character: characterReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
