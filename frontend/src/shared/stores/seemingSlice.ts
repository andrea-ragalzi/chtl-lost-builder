import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface SeemingState {
    selected: string | null;
}


const initialState: SeemingState = {
    selected: null,
};


const seemingSlice = createSlice({
    name: 'seemingSelection',
    initialState,
    reducers: {
        setSeeming: (state, action: PayloadAction<string>) => {
            state.selected = action.payload;
        },
        clearSeeming: (state) => {
            state.selected = null;
        },
    },
});

export const { setSeeming, clearSeeming } = seemingSlice.actions;
export default seemingSlice.reducer;
