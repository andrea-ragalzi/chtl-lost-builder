export type CostType = 'Glamour' | 'Willpower' | 'None' | 'Other';

export interface ContractItem {
    id: string;
    name: string;
    description: string;
}

export interface ContractState {
    list: ContractItem[];
}

export const EMPTY_CONTRACT_TEMPLATE: Omit<ContractItem, 'id'> = {
    name: '',
    description: '',
};

