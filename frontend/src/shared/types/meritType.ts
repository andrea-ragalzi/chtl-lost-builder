export interface Merit {
    name: string;
    cost: number[];
    category: ('Changeling' | 'Human');
    tags?: ('Motley' | 'Style')[];
    prerequisites?: string;
    effect: string;
}