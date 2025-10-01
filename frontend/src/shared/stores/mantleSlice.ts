import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../utils/';
import type { ListItem } from '../types/listItem';

export interface MantleItem extends ListItem {
    court: string;
    level: number;
    benefit: string;
    drawback: string;
}

const initialState: MantleItem[] = [];

const mantleSlice = createSlice({
    name: 'mantles',
    initialState,
    reducers: {
        addMantle: (state, action: PayloadAction<Omit<MantleItem, 'id'>>) => {
            state.push({ id: generateId(), ...action.payload });
        },
        updateMantle: (state, action: PayloadAction<Partial<MantleItem> & { id: string }>) => {
            const index = state.findIndex(m => m.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        removeMantle: (state, action: PayloadAction<string>) => {
            return state.filter(m => m.id !== action.payload);
        },
    },
});

export const { addMantle, updateMantle, removeMantle } = mantleSlice.actions;
export default mantleSlice.reducer;