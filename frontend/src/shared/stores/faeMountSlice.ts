import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ListItem } from '../types/listItem';
import { generateId } from '../utils';

export interface FaeMountItem extends ListItem {
    name: string;
    description: string;
}

const initialState: FaeMountItem[] = [];

const faeMountSlice = createSlice({
    name: 'faeMounts',
    initialState,
    reducers: {
        addFaeMount: (state, action: PayloadAction<Omit<FaeMountItem, 'id'>>) => {
            state.push({ id: generateId(), ...action.payload });
        },
        updateFaeMount: (state, action: PayloadAction<Partial<FaeMountItem> & { id: string }>) => {
            const index = state.findIndex(m => m.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        removeFaeMount: (state, action: PayloadAction<string>) => {
            return state.filter(m => m.id !== action.payload);
        },
    },
});

export const { addFaeMount, updateFaeMount, removeFaeMount } = faeMountSlice.actions;
export default faeMountSlice.reducer;