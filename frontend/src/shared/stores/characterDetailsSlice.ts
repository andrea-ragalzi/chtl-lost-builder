import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CharacterDetailsState {
  name: string;
  player: string;
  chronicle: string;
  concept: string;
  seeming: string;
  kith: string;
  court: string;
  needle: string;
  thread: string;
}

const initialState: CharacterDetailsState = {
  name: '',
  player: '',
  chronicle: '',
  concept: '',
  seeming: '',
  kith: '',
  court: '',
  needle: '',
  thread: ''
};

const characterDetailsSlice = createSlice({
  name: 'characterDetails',
  initialState,
  reducers: {
    updateCharacterDetails: (state, action: PayloadAction<{ field: keyof CharacterDetailsState; value: string }>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { updateCharacterDetails } = characterDetailsSlice.actions;
export default characterDetailsSlice.reducer;