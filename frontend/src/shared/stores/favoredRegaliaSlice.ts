import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoredRegaliaState {
    list: string[];
}

const initialState: FavoredRegaliaState = {
    list: [],
};

const favoredRegaliaSlice = createSlice({
    name: 'favoredRegalia',
    initialState,
    reducers: {
        addFavoredRegalia: (state, action: PayloadAction<string>) => {
            state.list.push(action.payload);
        },
        removeFavoredRegalia: (state, action: PayloadAction<number>) => {
            state.list.splice(action.payload, 1);
        },
        updateFavoredRegalia: (state, action: PayloadAction<{ index: number; text: string }>) => {
            state.list[action.payload.index] = action.payload.text;
        },
    },
});

export const { addFavoredRegalia, removeFavoredRegalia, updateFavoredRegalia } = favoredRegaliaSlice.actions;
export default favoredRegaliaSlice.reducer;