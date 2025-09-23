import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MeritState {
  // Maps a merit name to the points spent on it, e.g., { 'Noblesse Oblige': 2 }
  selected: Record<string, number>;
}

const initialState: MeritState = {
  selected: {},
};

const meritSlice = createSlice({
  name: 'merits',
  initialState,
  reducers: {
    setMeritRating: (state, action: PayloadAction<{ name: string; rating: number }>) => {
      const { name, rating } = action.payload;
      if (rating > 0) {
        state.selected[name] = rating;
      } else {
        // If rating is 0, remove it from the state
        delete state.selected[name];
      }
    },
    clearMerits: () => initialState,
  },
});

export const { setMeritRating, clearMerits } = meritSlice.actions;
export default meritSlice.reducer;