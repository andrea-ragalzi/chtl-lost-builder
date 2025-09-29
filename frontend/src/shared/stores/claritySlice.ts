import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ClarityState {
    current: number;
    max: number;
}

const initialState: ClarityState = {
    current: 10,
    max: 10,
};

const claritySlice = createSlice({
    name: 'clarity',
    initialState,
    reducers: {
        setClarity: (state, action: PayloadAction<number>) => {
            state.current = Math.min(action.payload, state.max);
        },
    },
});

export const { setClarity } = claritySlice.actions;
export default claritySlice.reducer;