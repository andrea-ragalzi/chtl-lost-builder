import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { SKILL_GROUPS } from '../data/skillData';

type SkillGroup = 'mental' | 'physical' | 'social';

// Generate an initial state object with all skills set to 0.
const initialSkillPoints = Object.values(SKILL_GROUPS).flat().reduce((acc, skill) => {
    acc[skill.toLowerCase()] = 0;
    return acc;
}, {} as Record<string, number>);

interface SkillState {
    priorities: {
        mental: number;
        physical: number;
        social: number;
    };
    points: Record<string, number>;
}

const initialState: SkillState = {
    // Set a default priority assignment to ensure the swap logic works correctly from the start.
    priorities: {
        mental: 11,
        physical: 7,
        social: 4,
    },
    points: initialSkillPoints,
};

const skillSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        // New reducer to handle swapping group priorities (11, 7, 4)
        setSkillPriority: (state, action: PayloadAction<{ group: SkillGroup; value: number }>) => {
            const { group, value } = action.payload;
            const currentPriorities = state.priorities;
            const previousValue = currentPriorities[group];

            if (previousValue === value) return;

            const otherGroupKey = Object.keys(currentPriorities).find(
                key => currentPriorities[key as SkillGroup] === value
            ) as SkillGroup;

            currentPriorities[group] = value;
            currentPriorities[otherGroupKey] = previousValue;
        },
        setSkillPoints: (state, action: PayloadAction<{ skill: string; value: number }>) => {
            const { skill, value } = action.payload;
            const skillKey = skill.toLowerCase();

            if (value >= 0 && value <= 5) {
                state.points[skillKey] = value;
            }
        },
        clearSkills: () => initialState,
    },
});

export const { setSkillPriority, setSkillPoints, clearSkills } = skillSlice.actions;
export default skillSlice.reducer;