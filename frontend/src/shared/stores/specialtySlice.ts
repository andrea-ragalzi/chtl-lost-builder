import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SpecialtyState {
  specialties: Record<string, string>; // e.g., { 'athletics': 'Parkour' }
}

const initialState: SpecialtyState = {
  specialties: {},
};

const specialtySlice = createSlice({
  name: 'specialties',
  initialState,
  reducers: {
    setSpecialty: (state, action: PayloadAction<{ skill: string; text: string }>) => {
      const { skill, text } = action.payload;
      const skillKey = skill.toLowerCase();
      state.specialties[skillKey] = text;
    },
    clearSpecialties: () => initialState,
  },
});

export const { setSpecialty, clearSpecialties } = specialtySlice.actions;
export default specialtySlice.reducer;