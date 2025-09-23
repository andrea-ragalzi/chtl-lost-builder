import { type CharacterSheetType } from "../types/characterSheetType";

export const initialCharacter: CharacterSheetType = {
    name: '',
    player: '',
    seeming: '',
    kith: '',
    court: '',
    attributes: {
        power: { intelligence: 1, wits: 1, resolve: 1 },
        finesse: { strength: 1, dexterity: 1, stamina: 1 },
        resistance: { presence: 1, manipulation: 1, composure: 1 },
    },
    skills: {
        mental: { academics: 0, computer: 0, crafts: 0, investigation: 0, medicine: 0, occult: 0, politics: 0, science: 0 },
        physical: { athletics: 0, brawl: 0, drive: 0, firearms: 0, larceny: 0, stealth: 0, survival: 0, weaponry: 0 },
        social: { animal_ken: 0, empathy: 0, expression: 0, intimidation: 0, persuasion: 0, socialize: 0, streetwise: 0, subterfuge: 0 },
    },
    wyrd: 1,
    clarity: 7,
    merits: [],
    contracts: [],
    size: 5,
};