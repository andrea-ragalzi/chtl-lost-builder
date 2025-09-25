export interface Merit {
    name: string;
    description: string;
    cost: number[]; // An array of possible costs, e.g., [1], or [1, 2, 3] for variable
    category: 'Changeling';
}

export const meritData: Merit[] = [
    {
        name: 'Acute Senses',
        description: 'Your senses are exceptionally keen, even by high Clarity standards.',
        cost: [1],
        category: 'Changeling',
    },
    {
        name: 'Lethal Mien',
        description: 'Your character’s fae aura has become warped, leaving them with sharp nails, jagged teeth, or other offensive features that allow them to deal lethal damage with unarmed attacks.',
        cost: [2],
        category: 'Changeling',
    },
    {
        name: 'Manymask',
        description: 'You can spend 1 Glamour to permanently change the look of your Mask.',
        cost: [3],
        category: 'Changeling',
    },
    {
        name: 'Market Sense',
        description: 'You have an intuitive grasp of an item\'s value, particularly in the Orchard.',
        cost: [1],
        category: 'Changeling',
    },
    {
        name: 'Noblesse Oblige',
        description: 'You know how to leverage your Mantle\'s power to inspire others.',
        cost: [1, 2, 3],
        category: 'Changeling',
    },
    {
        name: 'Pandemoniacal',
        description: 'You\'re more skilled than others at inciting Bedlam (a powerful emotional surge).',
        cost: [1, 2, 3],
        category: 'Changeling',
    },
    {
        name: 'Parallel Lives',
        description: 'You are deeply connected to your fetch and can occasionally sense each other\'s emotions.',
        cost: [3],
        category: 'Changeling',
    },
    {
        name: 'Rigid Mask',
        description: 'The protection of your Mask extends beyond normal mortal camouflage, making you immune to magical effects that might reveal your true fae face.',
        cost: [3],
        category: 'Changeling',
    },
];