import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  // Add other user fields if needed
}

interface AuthState {
  user: User | null;
}

// The initial state no longer contains the token
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // The action now only receives user data
    setCredentials: (
      state,
      { payload: { user } }: PayloadAction<{ user: User }>
    ) => {
      state.user = user;
    },
    // Logout only clears the user
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;