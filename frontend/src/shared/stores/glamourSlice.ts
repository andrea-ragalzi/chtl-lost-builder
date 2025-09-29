import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GlamourState {
    current: number;
    max: number;
}

const initialState: GlamourState = {
    current: 20,
    max: 20,
};

const glamourSlice = createSlice({
    name: 'glamour',
    initialState,
    reducers: {
        spendGlamour: (state, action: PayloadAction<number>) => {
            state.current = Math.max(0, state.current - action.payload);
        },
        regainGlamour: (state, action: PayloadAction<number>) => {
            state.current = Math.min(state.max, state.current + action.payload);
        },
    },
});

export const { spendGlamour, regainGlamour } = glamourSlice.actions;
export default glamourSlice.reducer;