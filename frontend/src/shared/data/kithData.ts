import type { KithDetails } from "../types/kithType";

export const kithData: KithDetails[] = [
    {
        value: 'artist',
        label: 'Artist',
        tagline: "Would you mind stepping to the side? You're blocking my light.",
        description: "Artists are not just the painters or composers. They are, in a very real way, their art. They are trained to create things solely for the Gentry and are extremely protective of their works in progress.",
        blessing: "Choose either Crafts or Expression. When the Artist uses a Specialty for art with that Skill, achieving three successes counts as an exceptional success.",
        uniquePower: "Tools of the Trade: Spend 1 Glamour to gain bonus dice equal to your Wyrd (max +5) on a Crafts or Expression roll with one of her Specialties pertaining to creating art. Necessary implements manifest for a scene.",
        image: '../../../public/images/kith/artist.png'
    },
    {
        value: 'bright_one',
        label: 'Bright One',
        tagline: "Excuse me. I was talking.",
        description: "Taken for their genuine passion, Bright Ones were subjected to nightmares centered on the things they love. Their mien radiates a soft glow always.",
        blessing: "When the Bright One uses Socialize to be the center of attention, achieving three successes counts as an exceptional success.",
        uniquePower: "Flare: Spend 1 Glamour to turn your glow to a dazzling brilliance that blinds enemies for one turn. Each enemy takes 1 bashing damage and rolls at a -2 on all Physical and Mental actions that turn.",
        image: '../../../public/images/kith/the_bright_one.png'},
    {
        value: 'chatelaine',
        label: 'Chatelaine',
        tagline: "I am useless if I don't serve. Another drink, madam?",
        description: "Chatelaines are the perfect servants, chosen for their attention to detail. They learned to work within a system, using others' power to survive while serving a capricious master.",
        blessing: "When the Chatelaine uses Empathy to determine a target's immediate desires, achieving three successes counts as an exceptional success.",
        uniquePower: "Will That Be All?: Spend 1 Glamour for the scene. With a successful Manipulation + Socialize roll, a Chatelaine may use the Social Merits of one other character in the scene as her own.",
        image: 'https://placehold.co/400x300/BDBDBD/000000?text=Chatelaine'
    },
    {
        value: 'gristlegrinder',
        label: 'Gristlegrinder',
        tagline: "Well, aren't you a little morsel. How about supper tonight, just the two of us?",
        description: "Gristlegrinders are the cannibalistic nightmares of other changelings, living garbage disposals who developed a taste for fae flesh while in Arcadia. Their hunger is all-consuming.",
        blessing: "When the Gristlegrinder uses Brawl to grapple someone with intent to eat them, achieving three successes counts as an exceptional success.",
        uniquePower: "To Serve Man: Can make bite attacks that deal lethal damage without needing to grapple. Can spend 1 Glamour and Stamina + Survival roll to swallow a smaller target whole (2 Lethal damage per turn inside).",
        image: 'https://placehold.co/400x300/8D6E63/FFFFFF?text=Gristlegrinder'
    },
    {
        value: 'helldiver',
        label: 'Helldiver',
        tagline: "Sorry, didn't mean to spook you! Hazard of the job, I guess.",
        description: "Helldivers are sent by their Keepers to places even the Fae cannot reach. They are unusual in that their Keepers encourage them to leave Arcadia, even if they remain tethered until their thread breaks. They are hungry for knowledge.",
        blessing: "When the Helldiver uses Larceny in the Hedge, Arcadia, or another unearthly realm, achieving three successes counts as an exceptional success.",
        uniquePower: "Dive: Spend 1 Glamour and Dexterity + Occult roll to fade into an incorporeal, invisible form over (10 - Clarity) turns (min 1). Can interact only with immaterial beings/objects (like Hedge ghosts).",
        image: 'https://placehold.co/400x300/3949AB/FFFFFF?text=Helldiver'
    },
    {
        value: 'hunterheart',
        label: 'Hunterheart',
        tagline: "[mournful howling in the distance]",
        description: "Hunterhearts are the wild animals of Arcadia, consumed with the urge to chase, to hunt, to kill. Their behavior hews to mythic archetypes rather than Darwinian textbooks.",
        blessing: "Choose either Investigation or Survival. When the Hunterheart uses the chosen Skill to track down creatures from Faerie, achieving three successes counts as an exceptional success.",
        uniquePower: "Pounce: Spend 1 Glamour to lock a target in place or cause them to flee in terror (Presence + Wyrd contested by Composure + Supernatural Tolerance). Unarmed attacks deal lethal damage to the affected target.",
        image: 'https://placehold.co/400x300/7CB342/FFFFFF?text=Hunterheart'
    },
    {
        value: 'leechfinger',
        label: 'Leechfinger',
        tagline: "Relax. Let your body melt into the table. That's it.",
        description: "Leechfingers are the vampiric nightmares of the Gentry, instruments of torture who steal life and vitality with a touch. They are drawn from mortals who build their identity around taking and receiving.",
        blessing: "When the Leechfinger uses Medicine to determine the health of a potential target, achieving three successes counts as an exceptional success.",
        uniquePower: "Sap The Vital Spark: Maintain contact for 1 turn, spend 1 Glamour to inflict 1 Bashing damage and heal/downgrade 1 point of own damage (2 damage against changelings).",
        image: 'https://placehold.co/400x300/880E4F/FFFFFF?text=Leechfinger'
    },
    {
        value: 'mirrorskin',
        label: 'Mirrorskin',
        tagline: "No, I'm not Jack Smith. Who's that?",
        description: "Mirrorskins are the spies and showpieces of the Gentry, unmatched in the art of disguise. They fight the battle to survive as someone else in its purest form.",
        blessing: "When the Mirrorskin uses Stealth while in disguise, achieving three successes counts as an exceptional success.",
        uniquePower: "Mercurial Visage: Spend 1 Glamour and make a reflexive Wits + Subterfuge + Wyrd roll to create an entirely new Mask. For 1 extra Glamour, can build a new composite mien.",
        image: 'https://placehold.co/400x300/00BCD4/000000?text=Mirrorskin'
    },
    {
        value: 'nightsinger',
        label: 'Nightsinger',
        tagline: "Thank you, you've been a lovely audience.",
        description: "Nightsingers are the kith who produce many of the magical songs in fairy tales. They find their songs hold less power in the mortal world, but their ability to enthrall others is still feared.",
        blessing: "When the Nightsinger uses Expression to sing or compose a piece of music, achieving three successes counts as an exceptional success.",
        uniquePower: "Siren Song: Spend 1 Glamour and roll Presence + Expression + Wyrd contested by Composure + Supernatural Tolerance. Failures gain the Swooned Condition and are rooted to the spot as long as the song continues.",
        image: 'https://placehold.co/400x300/FF9800/000000?text=Nightsinger'
    },
    {
        value: 'notary',
        label: 'Notary',
        tagline: "You do understand that when you agreed to bind your children... that they were being savagely literal, yes?",
        description: "Notaries are literally living documents, presiding over pledges between True Fae and others. They are both witness and oath, and can perfectly recite any pledge they officiate.",
        blessing: "When the Notary uses Politics to negotiate, read, or interpret a fae pledge, achieving three successes counts as an exceptional success.",
        uniquePower: "Abatement: Once per chapter, a Notary can completely negate the need for Glamour in a pledge as long as she is involved in its creation, without a roll.",
        image: 'https://placehold.co/400x300/5D4037/FFFFFF?text=Notary'
    },
    {
        value: 'playmate',
        label: 'Playmate',
        tagline: "Are you all right? You seem lonely. What can I do to make you smile?",
        description: "Each Playmate is shaped according to the whims of their specific Keeper and made to feel needed. They occupy an odd spot in Lost society, often viewed with suspicion but welcomed for their helpfulness.",
        blessing: "When the Playmate uses Socialize to help another character alleviate a negative social Condition (like Shaken or Guilty), achieving three successes counts as an exceptional success.", // Basato sul focus narrativo
        uniquePower: "Innocuous Mien: Spend 1 Glamour for the scene. All Social rolls against the Playmate that are intended to cause social harm (e.g., Intimidation, Subterfuge to betray) suffer a -2 penalty.", // Basato sul bisogno di non far sentire soli gli altri.
        image: 'https://placehold.co/400x300/F06292/000000?text=Playmate'
    },
    {
        "value": "snowskin",
        "label": "Snowskin",
        "tagline": "Just keep moving. Don't look back.",
        "description": "Snowskins were kept as quarry for the Gentry's Hunts. Their durance was one perpetual flight, honing their speed and endurance above all else.",
        "blessing": "When the Snowskin uses Athletics to chase or flee, achieving three successes counts as an exceptional success.",
        "uniquePower": "Unstoppable Momentum: Spend 1 Glamour. For the rest of the scene, the Snowskin increases their Speed by 2 and ignores the first point of wound penalties.",
        "image": "https://placehold.co/400x300/388E3C/FFFFFF?text=Snowskin"
    }
];