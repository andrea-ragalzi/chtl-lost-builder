// src/shared/stores/willpowerSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WillpowerState {
    current: number;
    // Rimuoviamo 'max' perché sarà calcolato nel componente.
}

const initialState: WillpowerState = {
    current: 0, // Inizializzato a 0 o al valore base del gioco (es. 1)
};

const willpowerSlice = createSlice({
    name: 'willpower',
    initialState,
    reducers: {
        // AZIONE 1: Usata dal componente DotRating per l'input manuale (dot by dot)
        updateCurrentWillpower: (state, action: PayloadAction<number>) => {
            // Non validiamo il massimale qui; lo fa il componente chiamante (DotRating).
            state.current = action.payload;
        },
        
        // AZIONE 2: Usata dalla logica dei contratti per la spesa automatica
        spendWillpower: (state, action: PayloadAction<number>) => {
            const amount = action.payload;
            state.current = Math.max(0, state.current - amount);
        },
        
        // AZIONE 3: Usata per resettare la Willpower quando cambia Resolve/Composure nel Builder
        // Questo è necessario perché il componente non può scrivere direttamente nel Redux se non c'è un'azione specifica.
        syncWillpowerMax: (state, action: PayloadAction<number>) => {
             // Quando il max cambia, assicurati che il current non sia superiore al nuovo max
             state.current = Math.min(state.current, action.payload);
        }
    },
});

// Esportiamo tutte le azioni necessarie
export const { updateCurrentWillpower, spendWillpower, syncWillpowerMax } = willpowerSlice.actions;
export default willpowerSlice.reducer;