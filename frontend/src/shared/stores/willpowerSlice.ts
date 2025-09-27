import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WillpowerState {
    current: number;
}

const initialState: WillpowerState = {
    current: 0,
};

const willpowerSlice = createSlice({
    name: 'willpower',
    initialState,
    reducers: {
        updateWillpower: (state, action: PayloadAction<number>) => {
            state.current = action.payload;
        }
    },
});

export const { updateWillpower } = willpowerSlice.actions;
export default willpowerSlice.reducer;