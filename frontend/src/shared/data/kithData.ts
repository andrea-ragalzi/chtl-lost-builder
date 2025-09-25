import type { KithDetails } from "../../features/builder/types/kithType";

export const kithData: KithDetails[] = [
    {
        value: 'artist',
        label: 'Artist',
        tagline: "Would you mind stepping to the side? You’re blocking my light.",
        description: "Artists are changelings who were forced to create art for their Keepers, often developing physical characteristics of their chosen medium. They are intensely protective of their works in progress, never showing them until they are flawless.",
        blessing: "When you use a Specialty for art with either the Crafts or Expression Skill, achieving three successes counts as an exceptional success.",
        uniquePower: "You can spend a point of Glamour to gain up to +5 bonus dice on a Crafts or Expression roll related to creating art. The necessary implements of your craft will manifest around you for a scene.",
        image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=Artist'
    },
    {
        value: 'bright_one',
        label: 'Bright One',
        tagline: "Excuse me. I was talking.",
        description: "Bright Ones were taken by the Gentry for their genuine passion, which was then turned into a nightmare of constant emotional exposure and punishment. Their mien always radiates a soft glow.",
        blessing: "When using the Socialize Skill to be the center of attention, achieving three successes counts as an exceptional success.",
        uniquePower: "You can spend a point of Glamour to turn your glow into a dazzling brilliance that blinds enemies for one turn, inflicting one point of bashing damage and a -2 penalty on all Physical and Mental actions for that turn.",
        image: 'https://placehold.co/400x300/FFEB3B/000000?text=Bright+One'
    },
    {
        value: 'chatelaine',
        label: 'Chatelaine',
        tagline: "I used to serve because it was a flogging otherwise. I left to get away from the whips and the cook’s rolling pin and the ever-present threat of the hounds — but I still serve. I am useless if I don’t serve. Another drink, madam?",
        description: "Chatelaines are the perfect servants, abducted by Keepers with a taste for the finer things. They learned to work within a system, using others' power to survive while serving a capricious master.",
        blessing: "When using the Empathy Skill to determine a target's immediate desires, achieving three successes counts as an exceptional success.",
        uniquePower: "By spending a point of Glamour for the scene, you can use the Social Merits of another character as your own with a successful Manipulation + Socialize roll.",
        image: 'https://placehold.co/400x300/BDBDBD/000000?text=Chatelaine'
    },
];