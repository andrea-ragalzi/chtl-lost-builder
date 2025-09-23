import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface KithState {
  selected: string | null;
}

const initialState: KithState = {
  selected: null,
};

const kithSlice = createSlice({
  name: 'kithSelection',
  initialState,
  reducers: {
    setKith: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    clearKith: (state) => {
      state.selected = null;
    },
  },
});

export const { setKith, clearKith } = kithSlice.actions;
export default kithSlice.reducer;