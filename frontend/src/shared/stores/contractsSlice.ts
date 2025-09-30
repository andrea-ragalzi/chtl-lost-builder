import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { ContractItem, ContractState } from '../types/contracType';

const initialState: ContractState = {
    list: [],
};

const contractsSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        // Builder Action: Adds a new contract, usually from the catalogue
        addContract: (state, action: PayloadAction<Omit<ContractItem, 'id'>>) => {
            const newContract: ContractItem = {
                ...action.payload,
                id: uuidv4(),
            };
            state.list.push(newContract);
        },
        // Builder Action: Updates all fields of an existing contract
        updateContract: (state, action: PayloadAction<ContractItem>) => {
            const index = state.list.findIndex((c) => c.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        // Builder Action: Removes a contract
        removeContract: (state, action: PayloadAction<{ id: string }>) => {
            state.list = state.list.filter((c) => c.id !== action.payload.id);
        },
        // Sheet/Tracking Action: For future in-game use
        toggleGoblinPact: (state, action: PayloadAction<{ id: string }>) => {
            const contract = state.list.find((c) => c.id === action.payload.id);
            if (contract) {
                contract.isGoblinPact = !contract.isGoblinPact;
            }
        },
    },
});

export const { addContract, updateContract, removeContract, toggleGoblinPact } = contractsSlice.actions;
export default contractsSlice.reducer;