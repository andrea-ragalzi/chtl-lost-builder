import type { ContractItem } from "../../../shared/types/contracType";

export const CONTRACT_CATALOGUE: ContractItem[] = [
    {
        id: 'c-arc-001',
        name: 'Darkness and Stillness (Mirror)',
        costValue: 1,
        costType: 'Glamour',
        dice: 'Presence + Subterfuge vs. target\'s Composure + Wyrd',
        action: 'Contested',
        duration: 'Scene',
        loophole: 'The target must be unaware of the Changeling\'s presence.',
        seemingBenefit: 'Targets suffer a -2 penalty to their next action.',
        isGoblinPact: false,
    },
    {
        id: 'c-arc-002',
        name: 'Aura of the Wounded Beast (Steed)',
        costValue: 1,
        costType: 'Glamour',
        dice: 'Manipulation + Expression',
        action: 'Instant',
        duration: 'One turn per dot of Wyrd',
        loophole: 'The Changeling must have taken at least 1 point of Bashing damage this scene.',
        seemingBenefit: 'Allows the Changeling to ignore the wound penalty for one turn.',
        isGoblinPact: false,
    },
    {
        id: 'c-spr-003',
        name: 'The Living Dolls (Spring Court)',
        costValue: 1,
        costType: 'Glamour',
        dice: 'Wits + Persuasion',
        action: 'Extended (5 successes)',
        duration: 'One week',
        loophole: 'Only works on individuals who secretly wish to be led.',
        seemingBenefit: 'Targets are always considered to have the "Pleasant" Condition toward the Changeling.',
        isGoblinPact: false,
    },
    {
        id: 'c-aut-004',
        name: 'Whispers of Ruin (Autumn Court)',
        costValue: 1,
        costType: 'Glamour',
        dice: 'Wits + Occult',
        action: 'Instant',
        duration: 'Instant',
        loophole: 'The target must already be dealing with a source of existential fear.',
        seemingBenefit: 'Target loses 1 die from their next defense roll.',
        isGoblinPact: false,
    },
    {
        id: 'c-gob-005',
        name: 'Goblin Debt: One Step Ahead',
        costValue: 1,
        costType: 'Willpower',
        dice: 'Manipulation + Larceny',
        action: 'Instant',
        duration: 'One turn',
        loophole: 'The Changeling must spend a Beat the next time they fail a roll.',
        seemingBenefit: 'Allows the Changeling to take an extra immediate action.',
        isGoblinPact: true, // Questo è un patto Goblin, la flag è importante!
    },
];

// Se vuoi creare un Contratto personalizzato (Homebrew)
export const EMPTY_CONTRACT: ContractItem = {
    id: '', // L'ID verrà generato con uuidv4() all'aggiunta
    name: '',
    costValue: 0,
    costType: 'None',
    dice: '',
    action: '',
    duration: '',
    loophole: '',
    seemingBenefit: '',
    isGoblinPact: false,
};