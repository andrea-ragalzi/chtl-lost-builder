// src/shared/stores/hollowsSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ListItem } from '../types/listItem';
import { generateId } from '../utils';

export interface HollowItem extends ListItem {
    security: number;
    size: string;
    description: string;
}

const initialState: HollowItem[] = [];

const hollowSlice = createSlice({
    name: 'hollows',
    initialState,
    reducers: {
        addHollow: (state, action: PayloadAction<Omit<HollowItem, 'id'>>) => {
            state.push({ id: generateId(), ...action.payload });
        },
        updateHollow: (state, action: PayloadAction<Partial<HollowItem> & { id: string }>) => {
            const index = state.findIndex(h => h.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        removeHollow: (state, action: PayloadAction<string>) => {
            return state.filter(h => h.id !== action.payload);
        },
    },
});

export const { addHollow, updateHollow, removeHollow } = hollowSlice.actions;
export default hollowSlice.reducer;