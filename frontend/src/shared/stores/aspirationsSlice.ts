import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ListItem } from '../types/listItem';

export type AspirationsDuration = 'short' | 'medium' | 'long';

interface AspirationsItem extends ListItem {
    description: string;
    duration: AspirationsDuration;
}

interface AspirationsState {
    list: AspirationsItem[];
}

const initialState: AspirationsState = {
    list: [],
};

const aspirationsSlice = createSlice({
    name: 'aspirations',
    initialState,
    reducers: {
        addAspiration: (state, action: PayloadAction<Omit<AspirationsItem, 'id'>>) => {
            state.list.push({ id: crypto.randomUUID(), ...action.payload });
        },
        removeAspiration: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(item => item.id !== action.payload);
        },
        updateAspiration: (state, action: PayloadAction<Partial<AspirationsItem> & { id: string }>) => {
            const index = state.list.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = { ...state.list[index], ...action.payload };
            }
        },
    },
});

export const { addAspiration, removeAspiration, updateAspiration } = aspirationsSlice.actions;
export default aspirationsSlice.reducer;