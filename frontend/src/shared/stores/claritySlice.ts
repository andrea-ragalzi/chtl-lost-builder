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
            state.current = Math.min(Math.max(0, action.payload), state.max);
        },
        loseClarity: (state) => {
            state.current = Math.max(0, state.current - 1);
        }
    },
});

export const { setClarity, loseClarity } = claritySlice.actions; // Esporta anche loseClarity
export default claritySlice.reducer;