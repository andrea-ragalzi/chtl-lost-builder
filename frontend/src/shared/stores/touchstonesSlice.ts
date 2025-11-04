import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TouchstonesState {
    list: string[];
}

const initialState: TouchstonesState = {
    list: [],
};

const touchstonesSlice = createSlice({
    name: 'touchstones',
    initialState,
    reducers: {
        addTouchstone: (state, action: PayloadAction<string>) => {
            state.list.push(action.payload);
        },
        removeTouchstone: (state, action: PayloadAction<number>) => {
            state.list.splice(action.payload, 1);
        },
        updateTouchstone: (state, action: PayloadAction<{ index: number; text: string }>) => {
            state.list[action.payload.index] = action.payload.text;
        },
    },
});

export const { addTouchstone, removeTouchstone, updateTouchstone } = touchstonesSlice.actions;
export default touchstonesSlice.reducer;