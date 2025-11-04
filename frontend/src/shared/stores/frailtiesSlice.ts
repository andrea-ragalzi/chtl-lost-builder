import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FrailtiesState {
    list: string[];
}

const initialState: FrailtiesState = {
    list: [],
};

const frailtiesSlice = createSlice({
    name: 'frailties',
    initialState,
    reducers: {
        addFrailty: (state, action: PayloadAction<string>) => {
            state.list.push(action.payload);
        },
        removeFrailty: (state, action: PayloadAction<number>) => {
            state.list.splice(action.payload, 1);
        },
        updateFrailty: (state, action: PayloadAction<{ index: number; text: string }>) => {
            state.list[action.payload.index] = action.payload.text;
        },
    },
});

export const { addFrailty, removeFrailty, updateFrailty } = frailtiesSlice.actions;
export default frailtiesSlice.reducer;