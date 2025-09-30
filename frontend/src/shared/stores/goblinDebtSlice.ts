import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface GoblinDebtItem {
    id: string; // ID univoco per la chiave React
    description: string; // Dettagli del debito (che cosa è dovuto)
    isRepaid: boolean; // True se è stato ripagato
}

interface GoblinDebtsState {
    debts: GoblinDebtItem[];
}

const initialState: GoblinDebtsState = {
    debts: [],
};

// Funzione helper per creare ID univoci (potresti usare un pacchetto come 'uuid')
const generateId = () => Math.random().toString(36).substring(2, 9);


const goblinDebtsSlice = createSlice({
    name: 'goblinDebts',
    initialState,
    reducers: {
        // 1. AZIONE Aggiungi Debito (usata da Contratto Goblin o aggiunta manuale)
        addDebt: (state, action: PayloadAction<string | undefined>) => {
            const newDebt: GoblinDebtItem = {
                id: generateId(),
                description: action.payload || "New Goblin Debt (details to be added)",
                isRepaid: false,
            };
            state.debts.push(newDebt);
        },
        
        // 2. AZIONE Toggle (Contrassegna come Ripagato/Non Ripagato)
        toggleDebtRepaid: (state, action: PayloadAction<string>) => {
            const debt = state.debts.find(d => d.id === action.payload);
            if (debt) {
                // Se un debito è ripagato, può essere segnato come tale.
                // Il conteggio totale dei debiti attivi NON CAMBIA ancora, 
                // finché il debito non viene *rimosso* dal GM/giocatore.
                debt.isRepaid = !debt.isRepaid; 
            }
        },

        // 3. AZIONE Rimuovi Debito (usata quando un debito Repaid viene archiviato e la Clarity è persa)
        removeDebt: (state, action: PayloadAction<string>) => {
            state.debts = state.debts.filter(d => d.id !== action.payload);
            // La logica di perdita di Clarity va eseguita dal componente chiamante se il conteggio ATTIVO scende a zero.
        },

        // 4. AZIONE Modifica Descrizione (per l'input di testo)
        updateDebtDescription: (state, action: PayloadAction<{ id: string, description: string }>) => {
            const debt = state.debts.find(d => d.id === action.payload.id);
            if (debt) {
                debt.description = action.payload.description;
            }
        }
    },
});

export const { addDebt, toggleDebtRepaid, removeDebt, updateDebtDescription } = goblinDebtsSlice.actions;
export default goblinDebtsSlice.reducer;