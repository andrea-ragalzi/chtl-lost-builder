import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GlamourState {
    max: number;
    current: number;
}

const initialState: GlamourState = {
    max: 10,
    current: 10,
};

const glamourSlice = createSlice({
    name: 'glamour',
    initialState,
    reducers: {
        spendGlamour: (state, action: PayloadAction<number>) => {
            const amount = action.payload;
            state.current = Math.max(0, state.current - amount);
        },
        gainGlamour: (state, action: PayloadAction<number>) => {
            state.current = Math.min(state.max, state.current + action.payload);
        },
        setMaxGlamour: (state, action: PayloadAction<number>) => {
            state.max = action.payload;
            state.current = Math.min(state.current, state.max);
        }
    },
});

export const { spendGlamour, gainGlamour, setMaxGlamour } = glamourSlice.actions;
export default glamourSlice.reducer;