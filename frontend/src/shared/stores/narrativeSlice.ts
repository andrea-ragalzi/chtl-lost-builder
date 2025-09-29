import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface NarrativeState {
    favoredRegalia: string[];
    frailties: string[];
    touchstones: string[];
}

const initialState: NarrativeState = {
    favoredRegalia: [],
    frailties: [],
    touchstones: [],
};

type ListKey = 'favoredRegalia' | 'frailties' | 'touchstones';

const narrativeSlice = createSlice({
    name: 'narrative',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<{ list: ListKey; text: string }>) => {
            const { list, text } = action.payload;
            state[list].push(text);
        },
        removeItem: (state, action: PayloadAction<{ list: ListKey; index: number }>) => {
            const { list, index } = action.payload;
            state[list].splice(index, 1);
        },
        updateItem: (state, action: PayloadAction<{ list: ListKey; index: number; text: string }>) => {
            const { list, index, text } = action.payload;
            state[list][index] = text;
        },
    },
});

export const { addItem, removeItem, updateItem } = narrativeSlice.actions;
export default narrativeSlice.reducer;