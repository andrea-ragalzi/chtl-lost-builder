import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WyrdState {
    current: number;
    max: number;
}

const initialState: WyrdState = {
    current: 1,
    max: 10,
};

const wyrdSlice = createSlice({
    name: 'wyrd',
    initialState,
    reducers: {
        setWyrd: (state, action: PayloadAction<number>) => {
            state.current = Math.min(action.payload, state.max);
        },
    },
});

export const { setWyrd } = wyrdSlice.actions;
export default wyrdSlice.reducer;