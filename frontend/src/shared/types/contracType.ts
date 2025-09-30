export type CostType = 'Glamour' | 'Willpower' | 'None' | 'Other';

export interface ContractItem {
    id: string;
    name: string;
    costValue: number;
    costType: CostType;
    dice: string;
    action: string;
    duration: string;
    loophole: string;
    seemingBenefit: string;
    isGoblinPact: boolean; 
}

export interface ContractState {
    list: ContractItem[];
}

