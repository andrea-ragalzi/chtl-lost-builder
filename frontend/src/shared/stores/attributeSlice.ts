import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AttributeGroup = 'mental' | 'physical' | 'social';

// Definisci un tipo per le chiavi degli attributi individuali
type IndividualAttribute = keyof AttributeState['individual'];

interface AttributeState {
  priorities: {
    mental: number;
    physical: number;
    social: number;
  };
  // Aggiunto per i singoli attributi (per la scheda editabile)
  individual: {
    intelligence: number;
    wits: number;
    resolve: number;
    strength: number;
    dexterity: number;
    stamina: number;
    presence: number;
    manipulation: number;
    composure: number;
  };
  // Aggiunto per i valori in-game
  gameState: {
    health: {
      max: number;
      current: number;
      bashing: number;
      lethal: number;
      aggravated: number;
    };
    willpower: {
      max: number;
      current: number;
    };
    glamour: {
      max: number;
      current: number;
    };
    clarity: {
      max: number;
      current: number;
    };
  };
}

// Set a default initial state so the swap logic always works.
const initialState: AttributeState = {
  priorities: {
    mental: 5,
    physical: 4,
    social: 3,
  },
  individual: {
    intelligence: 1,
    wits: 1,
    resolve: 1,
    strength: 1,
    dexterity: 1,
    stamina: 1,
    presence: 1,
    manipulation: 1,
    composure: 1,
  },
  gameState: {
    health: {
      max: 7,
      current: 7,
      bashing: 0,
      lethal: 0,
      aggravated: 0,
    },
    willpower: {
      max: 2,
      current: 2,
    },
    glamour: {
      max: 10,
      current: 10,
    },
    clarity: {
      max: 7,
      current: 7,
    },
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
    // Nuova azione per aggiornare singoli attributi (ora tipizzata senza 'any')
    updateAttribute: (state, action: PayloadAction<{ attribute: IndividualAttribute; value: number }>) => {
      const { attribute, value } = action.payload;
      const newValue = Math.min(Math.max(1, value), 5);
      state.individual[attribute] = newValue; // Ora sicuro, senza 'any'
    },
    // Nuove azioni per i valori in-game
    takeDamage: (state, action: PayloadAction<{ type: 'bashing' | 'lethal' | 'aggravated'; amount: number }>) => {
      const { type, amount } = action.payload;
      state.gameState.health[type] += amount;
      state.gameState.health.current = Math.max(0, state.gameState.health.max - state.gameState.health.bashing - state.gameState.health.lethal - state.gameState.health.aggravated);
    },
    spendWillpower: (state, action: PayloadAction<number>) => {
      state.gameState.willpower.current = Math.max(0, state.gameState.willpower.current - action.payload);
    },
    spendGlamour: (state, action: PayloadAction<number>) => {
      state.gameState.glamour.current = Math.max(0, state.gameState.glamour.current - action.payload);
    },
    spendClarity: (state, action: PayloadAction<number>) => {
      state.gameState.clarity.current = Math.max(0, state.gameState.clarity.current - action.payload);
    },
    updateDerivedValues: (state, action: PayloadAction<{ stamina: number; resolve: number; composure: number }>) => {
      const { stamina, resolve, composure } = action.payload;
      state.gameState.health.max = stamina + 7;
      state.gameState.health.current = Math.max(0, state.gameState.health.max - state.gameState.health.bashing - state.gameState.health.lethal - state.gameState.health.aggravated);
      state.gameState.willpower.max = resolve + composure;
      state.gameState.willpower.current = Math.min(state.gameState.willpower.current, state.gameState.willpower.max);
    },
    // The clear action now resets to the default assignment.
    clearAttributes: () => initialState,
  },
});

export const { setPriority, updateAttribute, takeDamage, spendWillpower, spendGlamour, spendClarity, updateDerivedValues, clearAttributes } = attributeSlice.actions;
export default attributeSlice.reducer;