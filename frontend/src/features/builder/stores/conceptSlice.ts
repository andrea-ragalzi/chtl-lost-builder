import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ConceptState {
  lifeBefore: string;
  durance: string;
  escape: string;
}

const initialState: ConceptState = {
  lifeBefore: '',
  durance: '',
  escape: '',
};

const conceptSlice = createSlice({
  name: 'concept',
  initialState,
  reducers: {
    updateConcept: (state, action: PayloadAction<Partial<ConceptState>>) => {
      return { ...state, ...action.payload };
    },
    clearConcept: () => initialState,
  },
});

export const { updateConcept, clearConcept } = conceptSlice.actions;
export default conceptSlice.reducer;