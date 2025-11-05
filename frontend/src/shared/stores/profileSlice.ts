import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    mortalName: string;
    faeName: string;
    playerName: string;
    apparentAge: number;
    gender: string;
    profession: string;
    motleyName: string;
    motleyRole: string;
    freeholdName: string;
    freeholdRole: string;
    concept: string;
    maskAppearance: string;
    mienAppearance: string;
    background: string;
    needleThread: string;
}

const initialState: ProfileState = {
    mortalName: '',
    faeName: '',
    playerName: '',
    apparentAge: 0,
    gender: '',
    profession: '',
    motleyName: '',
    motleyRole: '',
    freeholdName: '',
    freeholdRole: '',
    concept: '',
    maskAppearance: '',
    mienAppearance: '',
    background: '',
    needleThread: ''
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateMortalName: (state, action: PayloadAction<string>) => {
            state.mortalName = action.payload;
        },
        updateFaeName: (state, action: PayloadAction<string>) => {
            state.faeName = action.payload;
        },
        updatePlayerName: (state, action: PayloadAction<string>) => {
            state.playerName = action.payload;
        },
        updateApparentAge: (state, action: PayloadAction<number>) => {
            state.apparentAge = action.payload;
        },
        updateGender: (state, action: PayloadAction<string>) => {
            state.gender = action.payload;
        },
        updateProfession: (state, action: PayloadAction<string>) => {
            state.profession = action.payload;
        },
        updateMotleyName: (state, action: PayloadAction<string>) => {
            state.motleyName = action.payload;
        },
        updateMotleyRole: (state, action: PayloadAction<string>) => {
            state.motleyRole = action.payload;
        },
        updateFreeholdName: (state, action: PayloadAction<string>) => {
            state.freeholdName = action.payload;
        },
        updateFreeholdRole: (state, action: PayloadAction<string>) => {
            state.freeholdRole = action.payload;
        },
        updateConcept: (state, action: PayloadAction<string>) => {
            state.concept = action.payload;
        },
        updateMaskAppearance: (state, action: PayloadAction<string>) => {
            state.maskAppearance = action.payload;
        },
        updateMienAppearance: (state, action: PayloadAction<string>) => {
            state.mienAppearance = action.payload;
        },
        updateBackground: (state, action: PayloadAction<string>) => {
            state.background = action.payload;
        },
        updateNeedleThread: (state, action: PayloadAction<string>) => {
            state.needleThread = action.payload;
        },
    }
});

export const {
    updateMortalName,
    updateFaeName,
    updatePlayerName,
    updateApparentAge,
    updateGender,
    updateProfession,
    updateMotleyName,
    updateMotleyRole,
    updateFreeholdName,
    updateFreeholdRole,
    updateConcept,
    updateMaskAppearance,
    updateMienAppearance,
    updateBackground,
    updateNeedleThread
} = profileSlice.actions;

export default profileSlice.reducer;