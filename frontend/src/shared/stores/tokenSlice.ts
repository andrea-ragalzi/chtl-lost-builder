// src/shared/stores/tokenSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../utils';
import type { ListItem } from '../types/listItem';

export interface TokenItem extends ListItem {
    name: string;
    power: string;
    charges?: number;
}

const initialState: TokenItem[] = [];

const tokenSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<Omit<TokenItem, 'id'>>) => {
            state.push({ id: generateId(), ...action.payload });
        },
        updateToken: (state, action: PayloadAction<Partial<Omit<TokenItem, 'charges'>> & { id: string }>) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                 state[index] = { ...state[index], ...action.payload };
            }
        },
        updateTokenCharges: (state, action: PayloadAction<{ id: string, charges: number | undefined }>) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                 state[index].charges = action.payload.charges;
            }
        },
        removeToken: (state, action: PayloadAction<string>) => {
            return state.filter(t => t.id !== action.payload);
        },
    },
});

export const { addToken, updateToken, updateTokenCharges, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;