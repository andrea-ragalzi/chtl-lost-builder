// src/shared/stores/combatSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ListItem } from '../types/listItem';
import { generateId } from '../utils';

export interface CombatItem extends ListItem {
    weaponAttack: string; // Weapon/Attack
    dicePool: string;     // Dice Pool (es. Dexterity + Firearms + 2)
    damage: string;       // Damage (es. 2L, 5B)
    range: string;        // Range (es. 20/40/80)
    initiative: string;   // Initiative Modifier (es. +1)
    size: string;         // Size (es. 1, 3)
}

const initialState: CombatItem[] = [
    // Esempio iniziale per non partire da zero
    { 
        id: generateId(), 
        weaponAttack: 'Pugno', 
        dicePool: 'Forza + Abilità riss. -1', 
        damage: '0B', 
        range: 'Contatto', 
        initiative: '+0', 
        size: '1' 
    }
];

const combatSlice = createSlice({
    name: 'combat',
    initialState,
    reducers: {
        addCombatItem: (state, action: PayloadAction<Omit<CombatItem, 'id'>>) => {
            state.push({ id: generateId(), ...action.payload });
        },
        updateCombatItem: (state, action: PayloadAction<Partial<CombatItem> & { id: string }>) => {
            const index = state.findIndex(i => i.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        removeCombatItem: (state, action: PayloadAction<string>) => {
            return state.filter(i => i.id !== action.payload);
        },
    },
});

export const { addCombatItem, updateCombatItem, removeCombatItem } = combatSlice.actions;
export default combatSlice.reducer;