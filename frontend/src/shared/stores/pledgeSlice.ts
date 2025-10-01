import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PledgeItem {
    id: string; // ID univoco
    type: string; // Corrisponde alla colonna TYPE (es. 'Servizio', 'Patto', 'Favor')
    description: string; // Corrisponde alla colonna NOTES
}

interface PledgesState {
    list: PledgeItem[];
}

const initialState: PledgesState = {
    list: [],
};

// Funzione helper per creare ID univoci
const generateId = () => Math.random().toString(36).substring(2, 9);


const pledgeSlice = createSlice({
    name: 'pledges',
    initialState,
    reducers: {
        // AZIONE 1: Aggiunge un nuovo Pledge
        addPledge: (state, action: PayloadAction<{ type: string, description: string }>) => {
            const newPledge: PledgeItem = {
                id: generateId(),
                type: action.payload.type,
                description: action.payload.description,
            };
            state.list.push(newPledge);
        },
        
        // AZIONE 2: Rimuove un Pledge (quando è stato speso o adempiuto)
        removePledge: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(p => p.id !== action.payload);
        },

        // AZIONE 3: Aggiorna un campo esistente (per modifiche rapide)
        updatePledge: (state, action: PayloadAction<{ id: string, type?: string, description?: string }>) => {
            const pledge = state.list.find(p => p.id === action.payload.id);
            if (pledge) {
                if (action.payload.type !== undefined) {
                    pledge.type = action.payload.type;
                }
                if (action.payload.description !== undefined) {
                    pledge.description = action.payload.description;
                }
            }
        },
    },
});

export const { addPledge, removePledge, updatePledge } = pledgeSlice.actions;
export default pledgeSlice.reducer;