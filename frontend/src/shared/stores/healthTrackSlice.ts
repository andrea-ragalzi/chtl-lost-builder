import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface HealthTrackState {
    damage: ('none' | 'bashing' | 'lethal' | 'aggravated')[];
    maxHealth: number;
}

const initialState: HealthTrackState = {
    damage: Array(9).fill('none'),
    maxHealth: 9,
};

const healthTrackSlice = createSlice({
    name: 'healthTrack',
    initialState,
    reducers: {
        updateDamageBox: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            const currentState = state.damage[index];

            const getNextDamageState = (currentState: 'none' | 'bashing' | 'lethal' | 'aggravated') => {
                switch (currentState) {
                    case 'none':
                        return 'bashing';
                    case 'bashing':
                        return 'lethal';
                    case 'lethal':
                        return 'aggravated';
                    case 'aggravated':
                        return 'none';
                    default:
                        return 'none';
                }
            };

            state.damage[index] = getNextDamageState(currentState);
        },
        setInitialDamage: (state, action: PayloadAction<('none' | 'bashing' | 'lethal' | 'aggravated')[]>) => {
            state.damage = action.payload;
        },
        setMaxHealth: (state, action: PayloadAction<number>) => {
            state.maxHealth = action.payload;
        },
    },
});

export const { updateDamageBox, setInitialDamage, setMaxHealth } = healthTrackSlice.actions;
export default healthTrackSlice.reducer;