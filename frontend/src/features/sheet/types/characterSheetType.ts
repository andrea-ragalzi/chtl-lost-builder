export interface CharacterSheetType {
  // Header
  name: string;
  player: string;
  seeming: string;
  kith: string;
  court: string;

  // Attributes
  attributes: {
    power: { intelligence: number; wits: number; resolve: number; };
    finesse: { strength: number; dexterity: number; stamina: number; };
    resistance: { presence: number; manipulation: number; composure: number; };
  };

  // Skills
  skills: {
    mental: Record<string, number>;
    physical: Record<string, number>;
    social: Record<string, number>;
  };

  // Status
  wyrd: number;
  clarity: number;
  
  // Merits & Contracts
  merits: { name: string; rating: number }[];
  contracts: { name: string; cost: string; dicePool: string; action: string; duration: string; }[];

  // Combat
  size: number;
}