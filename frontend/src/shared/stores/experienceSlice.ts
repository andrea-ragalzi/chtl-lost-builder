import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ExperienceState {
    beats: number; // 0-5
    experiences: number;
}

const initialState: ExperienceState = {
    beats: 0,
    experiences: 0,
};

const experienceSlice = createSlice({
    name: 'experience',
    initialState,
    reducers: {
        addBeat: (state) => {
            if (state.beats < 5) {
                state.beats += 1;
                // Quando raggiungiamo 5 beats, convertiamoli in 1 experience
                if (state.beats === 5) {
                    state.beats = 0;
                    state.experiences += 1;
                }
            }
        },
        removeBeat: (state) => {
            if (state.beats > 0) {
                state.beats -= 1;
            }
        },
        addExperience: (state) => {
            state.experiences += 1;
        },
        removeExperience: (state) => {
            if (state.experiences > 0) {
                state.experiences -= 1;
            }
        },
        setExperiences: (state, action: PayloadAction<number>) => {
            state.experiences = Math.max(0, action.payload);
        },
    },
});

export const { addBeat, removeBeat, addExperience, removeExperience, setExperiences } = experienceSlice.actions;
export default experienceSlice.reducer;