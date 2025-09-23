import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AttributeGroup = 'mental' | 'physical' | 'social';

interface AttributeState {
  priorities: {
    mental: number;
    physical: number;
    social: number;
  };
}

// Set a default initial state so the swap logic always works.
const initialState: AttributeState = {
  priorities: {
    mental: 4,
    physical: 3,
    social: 2,
  },
};

const attributeSlice = createSlice({
  name: 'attributes',
  initialState,
  reducers: {
    setPriority: (state, action: PayloadAction<{ group: AttributeGroup; value: number }>) => {
      const { group, value } = action.payload;
      const currentPriorities = state.priorities;

      const previousValue = currentPriorities[group];

      // If the user clicks the button that's already selected, do nothing.
      if (previousValue === value) {
        return;
      }

      // Find which group is currently holding the value the user wants to assign.
      const otherGroupKey = Object.keys(currentPriorities).find(
        (key) => currentPriorities[key as AttributeGroup] === value
      ) as AttributeGroup; // We know this will be found.

      // Assign the new value to the group the user clicked.
      currentPriorities[group] = value;

      // Assign the previous value to the other group, completing the swap.
      currentPriorities[otherGroupKey] = previousValue;
    },
    // The clear action now resets to the default assignment.
    clearAttributes: () => initialState,
  },
});

export const { setPriority, clearAttributes } = attributeSlice.actions;
export default attributeSlice.reducer;