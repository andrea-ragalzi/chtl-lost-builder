import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface ConditionItem {
    id: string;
    name: string;
    isActive: boolean;
}

interface ConditionState {
    list: ConditionItem[];
}

const initialState: ConditionState = {
    list: [],
};

const conditionSlice = createSlice({
    name: 'condition',
    initialState,
    reducers: {
        addCondition: (state, action: PayloadAction<{ name: string }>) => {
            const { name } = action.payload;
            const newCondition: ConditionItem = {
                id: uuidv4(),
                name,
                isActive: true,
            };
            state.list.push(newCondition);
        },
        toggleCondition: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            const condition = state.list.find((condition) => condition.id === id);
            if (condition) {
                condition.isActive = !condition.isActive;
            }
        },
        removeCondition: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            state.list = state.list.filter((condition) => condition.id !== id);
        },
        setInitialConditions: (state, action: PayloadAction<ConditionItem[]>) => {
            state.list = action.payload;
        },
    },
});

export const { addCondition, toggleCondition, removeCondition, setInitialConditions } = conditionSlice.actions;
export default conditionSlice.reducer;