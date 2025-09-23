import { configureStore } from '@reduxjs/toolkit';
import builderReducer from '../features/builder/stores';

export const store = configureStore({
  reducer: {
    builder: builderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
