import type { Merit } from "../types/meritType";

export const meritData: Merit[] = [
    {
        name: 'Acute Senses',
        cost: [1],
        category: 'Changeling',
        prerequisites: 'Wits or Composure 3',
        effect: 'Your sight, hearing, and sense of smell operate at twice the distance and accuracy of mortal senses. \
        You add your Wyrd rating as bonus dice to any perception-based rolls, superseding the bonus from maximum Clarity.'
    },
    {
        name: 'Arcadian Metabolism',
        cost: [2],
        category: 'Changeling',
        effect: 'Your natural healing rates are increased while in the Hedge: Bashing damage heals at one point \
        per minute and lethal damage heals at one point per day. Aggravated damage healing is unaffected.',
    },
    {
        name: 'Brownie\'s Boon',
        cost: [1],
        category: 'Changeling',
        effect: 'Reduce the interval for any mundane extended action roll made while unwatched by half. \
        May spend 1 Glamour to halve it again (x4 speed). Exceptional success can reduce the interval to an eighth.',
    },
    {
        name: 'Cloak of Leaves',
        cost: [1, 2, 3],
        category: 'Changeling',
        prerequisites: 'Autumn Mantle 3',
        effect: 'You embrace your fears to shield against supernatural harm. Penalize any supernatural \
        ability used to cause damage or inflict physical Tilts upon you by a number of dice equal to this Merit\'s rating.'
    },
    {
        name: 'Cold Hearted',
        cost: [3],
        category: 'Changeling',
        prerequisites: 'Winter Mantle 3',
        effect: 'You can spend 1 Willpower once per scene to ignore the ill effects of a single \
        Clarity Condition for that scene. The Condition remains, and no Clarity damage is healed.',
    },
    {
        name: 'Court Goodwill',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',

        effect: 'Represents influence and respect in a Court that is not your own. Grants access to \
        that Court\'s Mantle effects at two dots lower, functions as the Allies Merit for that Court, \
        and grants a one-dot Mentor (Court liaison). May be taken multiple times for different Courts.',
    },
    {
        name: 'Defensive Dreamscaping',
        cost: [2],
        category: 'Changeling',
        effect: 'Add half your Wyrd (rounded down) to your Defense score while fighting \
        in dreams (oneiromancy).',
    },
    {
        name: 'Diviner',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',
        prerequisites: 'Composure 3, Wits 3',
        effect: 'You can enter a dream state (Bastion) to ask the Storyteller yes or no questions about \
        prophetic truths via the Dreaming Roads. You can ask a total number of questions per chapter equal to your Merit dots.',
    },
    {
        name: 'Dream Warrior',
        cost: [1],
        category: 'Changeling',
        prerequisites: 'Wyrd 2+, one Social Attribute 3+, a Specialty in Brawl or Weaponry',
        effect: 'When allocating successes from a Brawl or Weaponry attack to a subtle oneiromantic shift, \
        gain one bonus success to spend on that shift if it directly impacts the fight.',
    },
    {
        name: 'Dreamweaver',
        cost: [3],
        category: 'Changeling',
        prerequisites: 'Wyrd 3+',
        effect: 'Once per scene, you may spend 1 Willpower point to make three successes count as an exceptional \
        success on a dreamweaving roll (p. 217).',
    },
    {
        name: 'Dull Beacon',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',

        effect: 'Reduce your Wyrd by this Merit\'s rating when determining the distance at which you alert fae creatures \
        and open Hedge gateways when dropping your Mask (p. 83).',
    },
    {
        name: 'Elemental Warrior',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',
        tags: ['Style'],
        prerequisites: 'Dexterity or Wits 3+, Brawl, Firearms, or Weaponry 2+, Elemental Weapon or Primal Glory (Contracts) or Elemental seeming',
        effect: 'Choose one physical element (wind, flame, wood, etc.). All effects apply only to the chosen element:\
        \n(•) Wind Cuts to the Bone: Achieve exceptional success on elemental damage rolls with 3 successes (not 5). \
        \n(••) Defensive Flurry: Add half your Wyrd (rounded down) to your Dodge pool after doubling Defense. Allows Dodging Firearms attacks (Defense doesn\'t apply).\
        \n(•••) Hungry Leaping Flames: Spend 1 Glamour to make melee attacks from 10y/m away and add 10y/m to ranged attack ranges for the scene. Elemental effects may disturb scenery.\
        \n(••••) Antaean Endurance: While in contact with the element, gain Health boxes equal to half Wyrd (down). Add the same as bonus dice to resist fatigue/toxins.\
        \n(•••••) Wrath of Titans: Spend 1 Glamour to make successful attacks inflict either Blinded (one eye), Deafened (one ear), or Knocked Down Tilts for the scene.',
    },
    {
        name: 'Enchanting Performance',
        cost: [1, 2, 3],
        category: 'Changeling',
        tags: ['Style'],
        prerequisites: 'Presence 3, Expression 3',
        effect: 'You bring a little of the fae\'s captivating magic to your performances:\
        \n(•) Limerick: Roll Presence + Expression, resisted by target\'s Composure, to deliver scathing invective. \
        Target takes a penalty equal to successes to Social rolls against observers for the rest of the scene (max -5).\
        \n(••) Poem: When you successfully open a Door using Expression for performance, you may spend 1 Glamour \
        to open another Door immediately.\
        \n(•••) Sonnet: Spend 1 Glamour to gain the rote quality for your next mundane performance-related Expression \
        roll. On success, a target gains the Inspired Condition. On exceptional success, everyone viewing gains the Inspired Condition.',
    },
    {
        name: 'Fae Mount',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',

        effect: 'You have befriended a creature of the Hedge to serve as your steed. The mount appears anywhere in the Hedge \
        via a special signal. Each dot grants one of the following special abilities (may be taken multiple times for different Courts):\
        \n(•) Manyleague: Doubles the mount\'s Speed. You gain its rating as bonus to Initiative while mounted.\
        \n(•) Chatterbox: The steed can speak to and understand its owner clearly and relay simple messages to others.\
        \n(•) Actormask: You can bring the mount into the mundane world where it persists as long as you feed it 1 Glamour \
        once per scene. It possesses a Mask (e.g., armored spider becomes a Volkswagen Beetle).\
        \n(•) Armorshell: The mount gains 3/2 armor and provides partial concealment to anyone riding it.\
        \n(•) Burdenback: The mount gains an additional 2 dots of Stamina and can carry a number of individuals equal to this \
        Merit\'s rating in addition to its normal carrying capacity.\
        \n(•) Hedgefoot: The mount can either run across water (full speed), move up buildings (3x Speed), or fly once per scene \
        (2x Speed for turns equal to Merit dots).',
    },
    {
        name: 'Faerie Favor',
        cost: [3],
        category: 'Changeling',

        effect: 'You possess a promise (bauble, song, or phrase) that entitles you to a favor from one of the True Fae. \
        Calling in the favor grants you Merits appropriate to the Gentry\'s power. \
        Drawback: You gain the Notoriety Condition among the Lost when the favor is called in.',
    },
    {
        name: 'Fair Harvest',
        cost: [1, 2],
        category: 'Changeling',

        effect: 'Choose a specific emotion when taking this Merit. \
        \n(•) Rolls to harvest that emotion enjoy the 8-again quality. Rolls for other emotions lose 10-again. \
        \n(••) Harvesting the favored emotion instead enjoys the rote quality. Subtract 1 success from rolls to harvest other emotions (in addition to losing 10-again).',
    },
    {
        name: 'Firebrand',
        cost: [2],
        category: 'Changeling',
        prerequisites: 'Summer Mantle 3',
        effect: 'Once per scene, when your character successfully goads someone into a fight, you regain a single Willpower point.',
    },
    {
        name: 'Gentrified Bearing',
        cost: [2],
        category: 'Changeling',
        prerequisites: 'Wyrd 2+',
        effect: 'Hobgoblins tend to mistake you for a True Fae. When dealing with hobgoblins, add your Wyrd rating \
        in dice to Intimidation rolls (max +5).',
    },
    {
        name: 'Glamour Fasting',
        cost: [1],
        category: 'Changeling',

        effect: 'As long as you have Willpower remaining, you do not suffer from Glamour deprivation when you drop to \
        Glamour 0 (or below Wyrd) until one full chapter has passed since you last had any Glamour.',
    },
    {
        name: 'Goblin Bounty',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',

        effect: 'You have access to three times your dots in this Merit of common goblin fruits and oddments per chapter. \
        These are safely stored and do not require a special scene to access.',
    },
    {
        name: 'Grounded',
        cost: [3],
        category: 'Changeling',
        prerequisites: 'Spring Mantle 3',
        effect: 'Your sure perceptions give you an **armor rating of 1 against all Clarity attacks** that deal mild damage.',
    },
    {
        name: 'Hedge Brawler',
        cost: [2],
        category: 'Changeling',
        prerequisites: 'Brawl, Firearms, or Weaponry 2+',
        effect: 'When fighting in the Hedge, you may take a dice penalty on a violent action (between -1 and -3) \
        to gain that number of extra successes, usable only for shaping Hedge details (Hedgespinning).',
    },
    {
        name: 'Hedge Duelist',
        cost: [1, 2, 3],
        category: 'Changeling',
        tags: ['Style'],
        prerequisites: 'Presence or Manipulation 2+, Brawl or Weaponry 2+, any Social Skill 2+',
        effect: 'A skilled fae duelist capable of turning the Hedge into a weapon. Effects only work in the Hedge proper:\
        \n(•) Thousand Falling Leaves: Inflict a -1 Defense penalty on an opponent against one attack in exchange for \
        only dealing half the damage the attack would normally deal.\
        \n(••) Emerald Shield: Gain an armor rating of 2/0, which stacks with worn armor but not with armor from Hedgespinning/Contracts.\
        \n(•••) Bite Like Thorns: Add a dice bonus to attacks equal to the wound penalty your foe suffers (due to the Hedge interfering with their wounds).',
    },
    {
        name: 'Hedge Sense',
        cost: [1],
        category: 'Changeling',

        effect: 'Gain a **two-die bonus** to all rolls to navigate the Hedge, and to find Icons, food, shelter, or goblin fruit there.',
    },
    {
        name: 'Hob Kin',
        cost: [1],
        category: 'Changeling',

        effect: 'Hobgoblins show you a kind of kinship and treat you less ruthlessly. Increase your starting impression \
        with non-hostile hobgoblins by one level on the chart (p. 192) for Social maneuvering. \
        Additionally, if you have a Hollow, you may take the enhancement Hob Alarm.',
    },
    {
        name: 'Hollow',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',
        tags: ['Motley'],
        prerequisites: 'Motley Investment',
        effect: 'A private, secure pocket of real estate inside the Hedge, tied to a single physical entrance. \
        While inside, attempts to learn your personal info, pursue, or track you suffer a dice penalty equal to \
        the Merit\'s rating (like Anonymity). Only entities with Wyrd > Merit rating can force entry. \
        The Hollow can have any combination of the following Enhancements up to its total rating:\
        \n- Hob Alarm (1): Requires Hob Kin. Prevents Defense loss due to surprise, adds Hollow rating to all actions \
        in the first turn of combat (Drawback: 1 Goblin Debt per story).\
        \n- Luxury Goods (1): Once per chapter, roll Hollow rating to retrieve one mundane or Hedgespun item with \
        an Availability/dot rating <= successes (lasts 1 scene).\
        \n- Shadow Garden (1): Goblin fruit consumed in the Hollow reappears in the garden an hour later (fruit only sates \
        hunger temporarily).\
        \n- Phantom Phone Booth (1): Allows calling any public listing outside the Hedge; calls are untraceable, traced to \
        recipient\'s line.\
        \n- Route Zero (1): A 1-dot trod bisects the Hollow. Traversing it requires a Hedge navigation roll; success \
        returns travelers where they began and regains 1 Willpower (once per day).\
        \n- Size Matters (1 or 2): Increases the size of the Hollow from 2 people (base) to a small estate (2 dots).\
        \n- Escape Route (1 or 2): Creates a second, one-way emergency exit, stationary (1 dot) or reflexive (2 dots).\
        \n- Hidden Entry (2): When all investing motley members are inside, the entrance evaporates; finding it suffers -2 dice penalty.\
        \n- Easy Access (3): No permanent entrance. Access by spending 1 Glamour at any unlocked door.\
        \n- Home Turf (3): Gain the Merit\'s rating as a bonus to Initiative and Defense against intruders inside.',
    },
    {
        name: 'Lethal Mien',
        cost: [2],
        category: 'Changeling',

        effect: 'Your unarmed attacks inflict **lethal damage**. If another power already grants lethal damage, add \
        one to your unarmed weapon modifier instead. You may choose whether to use this benefit at will.',
    },
    {
        name: 'Mantle',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',
        prerequisites: 'Joining a Court',
        effect: 'Represents your mystical connection to your chosen Court. Add your Mantle rating to Social rolls \
        against other members of your Court and characters with the appropriate Court Goodwill. Allows learning \
        Court Contracts. Provides a new way to harvest Glamour and grants progressive bonuses:\
        \n\n--- SPRING (Glamour: Overstep personal bounds to satisfy desires) ---\
        \n(•) Gain +Mantle dice to mundane rolls to seduce or attract someone.\
        \n(••) Gain +Mantle dice to mundane actions that encourage or bring about over-indulgence.\
        \n(•••) Gain +Mantle dice during mundane teamwork actions to help an ally achieve her goals.\
        \n(••••) Regain an additional Willpower point when regaining one through your Needle.\
        \n(•••••) Once per chapter, convert one Clarity Condition (self or ally) into a different, beneficial Condition of \
        your choice, and regain 1 Clarity.\
        \n\n--- SUMMER (Glamour: Enact wrath and successfully further a goal) ---\
        \n(•) Gain +Mantle dice to mundane rolls to intimidate or cow someone.\
        \n(••) Gain +Mantle dice to mundane attack rolls when actively defending your freehold against a fae threat.\
        \n(•••) Gain General and Ballistic armor equal to Mantle dots when acting as a protector/bodyguard/champion (stacks with worn armor).\
        \n(••••) Automatically succeed on attempts to break through mundane barriers or deal with inanimate impediments.\
        \n(•••••) When defending a member of your freehold, your mundane attacks deal **aggravated damage**.\
        \n\n--- AUTUMN (Glamour: Overcome fear to investigate something new and dangerous) ---\
        \n(•) Gain +Mantle dice to mundane rolls to investigate the True Fae or Faerie.\
        \n(••) Gain +Mantle dice to mundane rolls to intimidate or instill fear in someone.\
        \n(•••) Reduce the Glamour cost of Contracts by 1 when using them to subvert a True Fae or something from Faerie.\
        \n(••••) Once per story, reduce your Goblin Debt by your Mantle rating.\
        \n(•••••) After a magical effect affects you, spend 2 Glamour to mimic that effect exactly on a new target (must be in the same scene).\
        \n\n--- WINTER (Glamour: Help someone come to terms with their grief) ---\
        \n(•) Enemies suffer a penalty equal to your Mantle dots to rolls to notice you when you\'re deliberately spying.\
        \n(••) Gain +Mantle dice when obscuring the truth.\
        \n(•••) When you surrender in a fight, gain +Mantle dice to any subsequent Social actions for the rest of the scene.\
        \n(••••) Spend 1 Glamour to bind someone in their misery. They suffer the Beaten Down Tilt when entering a fight (must spend 2 Willpower to end).\
        \n(•••••) Ignore wound penalties. Gain a +1 die bonus on Physical actions for each health box filled with lethal or aggravated damage (max +5).',
    },
    {
        name: 'Manymask',
        cost: [3],
        category: 'Changeling',
        prerequisites: 'Wyrd 2+, Manipulation 3',
        effect: 'You may spend 1 Glamour to permanently change your Mask. You may make one change per chapter per \
        dot of Wyrd you possess to eye color, hair color, facial structure, or skin tone, or remove minor features \
        (scars, birthmarks). At Wyrd 5+, you may create an entirely new Mask once per chapter (sex can change; height/build remains).',
    },
    {
        name: 'Market Sense',
        cost: [1],
        category: 'Changeling',

        effect: 'You know how to better navigate the odd exchanges and values of the Hedge. Once per chapter, you \
        may reduce your character\'s **Goblin Debt by one**.',
    },
    {
        name: 'Noblesse Oblige',
        cost: [1, 2, 3],
        category: 'Changeling',
        prerequisites: 'Appropriate court Mantle 1+',
        effect: 'You harness your Mantle to inspire others. By spending 1 Willpower, you grant your Court members \
        (Mantle or Court Goodwill) a bonus equal to this Merit\'s rating to the following rolls for a scene (not applicable to self). \
        \n- Spring: Initiative rolls.\
        \n- Summer: Resolve-based rolls.\
        \n- Autumn: Contract rolls.\
        \n- Winter: Composure-based rolls.\
        \nDrawback: Those under your command gain a **two-die bonus** to Social rolls against you.',
    },
    {
        name: 'Pandemoniacal',
        cost: [1, 2, 3],
        category: 'Changeling',
        prerequisites: 'Wyrd 6+',
        effect: 'You are more adept at inciting **Bedlam** than your fellows. Add this Merit\'s rating as a dice bonus \
        to any rolls you make to incite Bedlam (p. 110).',
    },
    {
        name: 'Parallel Lives',
        cost: [3],
        category: 'Changeling',

        effect: 'You are deeply connected to your **Fetch**. You both experience flashes of the other\'s emotional state \
        and gain a **two-die bonus** to use Empathy or magic to read the other\'s intentions or enter their Bastion. \
        Spend 1 Willpower to ride along with the other\'s senses (minutes = Wyrd), losing your Defense. \
        Spend 1 Willpower to send a vague, simple thought message.',
    },
    {
        name: 'Rigid Mask',
        cost: [3],
        category: 'Changeling',
        prerequisites: 'Subterfuge 2+',
        effect: 'Mortals (and lie detectors) automatically fail rolls to notice when you are lying or what you are feeling. \
        Supernatural creatures must engage in a Clash of Wills to notice your lies. \
        Drawback: Intentionally dropping your Mask deals you **1 point of lethal damage** in addition to the normal rules.',
    },
    {
        name: 'Stable Trod',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',
        tags: ['Motley'],
        prerequisites: 'Motley Investment',
        effect: 'Your freehold has secured and maintained a Trod with a rating equal to this Merit\'s dots. The Trod provides two \
        additional advantages:\
        \n(1) Hollow Enhancements: Hollows along the Trod gain an extra **one-dot Hollow enhancement** (same for all Hollows, \
        benefiting up to the Stable Trod rating number of Hollows).\
        \n(2) Goblin Fruit Bounty: Once per story, roll your Stable Trod dots. Each success produces **one additional generic fruit** \
        containing 1 Glamour.',
    },
    {
        name: 'Token',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',
        tags: ['Motley'],
        prerequisites: 'Motley Investment',
        effect: 'You or your motley possess one or more **Tokens** (mystical items, p. 222) with a total dot rating \
        equal to your rating in this Merit. No single Token may have a rating higher than five, but the total Merit \
        rating can exceed 5 dots. \
        You can purchase oath-forged tokens (p. 224) by adding 1 dot to its effective rating; you can purchase a stolen \
        token (p. 225) at an effective rating of 1 dot lower than the token\'s rating.',
    },
    {
        name: 'Touchstone',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',

        effect: 'Each dot in this Merit allows for an ** additional Touchstone**. Cannot be purchased if the last Clarity \
        box already has an associated Touchstone (see p. 98). \
        Drawback: Losing attachment with Touchstones speeds the loss of Clarity.',
    },
    {
        name: 'Warded Dreams',
        cost: [1, 2, 3],
        category: 'Changeling',
        prerequisites: 'Resolve equal to dots in Warded Dreams',
        effect: 'Your character\'s dream **Bastion is well fortified** against intrusion. Each dot in Warded Dreams \
        increases the Bastion\'s **Fortification rating by one**.',
    },
    {
        name: 'Workshop',
        cost: [1, 2, 3, 4, 5],
        category: 'Changeling',
        prerequisites: 'Hollow',
        effect: 'You maintain equipment and tools within your Hollow for creating items. Each dot represents equipment \
        for one particular **Craft Specialty** (e.g., Blacksmithing, Goblin Fruit Farming). When you use the Workshop \
        for Building Equipment (p. 196) or other Crafts rolls with one of these Specialties, you gain a bonus equal \
        to your Merit dots to the roll.',
    },
    {
        name: 'Allies',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        effect: 'Represents one type of ally (individual, organization, clique). Each dot is a level of influence (1=small favors, 5=major influence). \
        You can ask for favors that sum up to the Merit rating per chapter without penalty. Asking for more requires a \
        Manipulation + Persuasion + Allies roll (penalty = favor rating). On success, lose 1 dot (Sanctity of Merits applies). \
        Can be used to block another character\'s Merits (Favor rating = blocked Merit dots).',
        tags: ['Motley'],
    },
    {
        name: 'Alternate Identity',
        cost: [1, 2, 3],
        category: 'Human',
        effect: 'You have an established alternate identity. \
        (•) Superficial/Unofficial. +1 die to Subterfuge to defend the identity.\
        \n(••) Supported with paperwork, withstands basic private investigation. +1 die to Subterfuge to defend the identity.\
        \n(•••) Deeply entrenched, passes thorough inspection. +2 dice to Subterfuge to defend the identity. \
        Can be purchased multiple times for additional identities.',
    },
    {
        name: 'Anonymity',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        prerequisites: 'Cannot have Fame.',
        effect: 'You live off the grid, avoiding official influence. Attempts to find you by paper trail suffer a **-1 die penalty per dot**. \
        Drawback: Cannot purchase Fame, may limit Status purchases.',
    },
    {
        name: 'Common Sense',
        cost: [3],
        category: 'Human',
        effect: 'Once per session as an instant action, roll Wits + Composure. On success, you may ask the Storyteller \
        one question about the safest/worst choice, potential loss, or worthlessness of a lead. Exceptional success grants \
        an additional question. Dramatic failure allows the ST to give false advice (Gain a Beat if you follow it).',
    },
    {
        name: 'Contacts',
        cost: [1],
        category: 'Human',
        effect: 'You have sources for **information only**. Each instance is a sphere or organization. Gaining info requires a \
        Manipulation + Social Skill roll (modifiers -3 to +3 depending on relevance, danger, and relationship). Can be purchased \
        multiple times for different sources.',
        tags: ['Motley'],
    },
    {
        name: 'Danger Sense',
        cost: [2],
        category: 'Human',
        effect: 'You gain a **+2 modifier** on reflexive Wits + Composure rolls to detect an impending ambush.',
    },
    {
        name: 'Demolisher',
        cost: [1, 2, 3],
        category: 'Human',
        prerequisites: 'Strength or Intelligence 3+',
        effect: 'You have an innate feel for the weak points in objects. When damaging an object, you **ignore one point \
        of the object\'s Durability per dot** in this Merit.',
    },
    {
        name: 'Direction Sense',
        cost: [1],
        category: 'Human',
        effect: 'You have an innate sense of direction, always aware of your location in space and the cardinal directions. \
        You never suffer penalties to navigate or find your way in the mundane world (no effect in the Hedge).',
    },
    {
        name: 'Eidetic Memory',
        cost: [2],
        category: 'Human',
        effect: 'You recall events and details with pinpoint accuracy (no roll required for past experiences). You gain a \
        **+2 bonus** on Intelligence + Composure (or relevant Skill) rolls to recall minute facts from large amounts of information.',
    },
    {
        name: 'Encyclopedic Knowledge',
        cost: [2],
        category: 'Human',
        effect: 'Choose a Skill/area of interest (e.g., Science, Pop Culture). You have collected limitless facts about this topic. \
        You can make an Intelligence + Wits roll at any time when dealing with your area of interest. On success, the \
        Storyteller must give a relevant fact/detail (which you must explain within your character\'s background).',
    },
    {
        name: 'Etiquette',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        tags: ['Style'],
        prerequisites: 'Composure 3+, Socialize 2+',
        effect: 'Applies to social interactions where customs, style, and reputation carry weight. Uses Social Maneuvering rules.\
        \n(•) Bless His Heart: Use Socialize for starting Doors instead of the lower of Resolve/Composure.\
        \n(••) Losing Your Religion: When insulting a target, use 8-again and gain a **two-die bonus** to the roll. Interaction moves one step down the impressions chart.\
        \n(•••) In High Cotton: Apply one relevant Status or Fame Merit to rolls to contest Social interactions.\
        \n(••••) Half-Cocked: In a new Social interaction with good, excellent, or perfect impression, ignore the subject\'s Resolve and Composure on the first roll.\
        \n(•••••) Grace Under Fire: If a character opens all your Doors and you offer an alternative, you choose 1 Condition received (from 3 chosen by the opponent).',
    },
    {
        name: 'Fame',
        cost: [1, 2, 3],
        category: 'Human',
        prerequisites: 'Cannot have Anonymity.',
        effect: 'You are recognized in a certain sphere/subculture (•=local, ••=regional, •••=worldwide). Each dot adds \
        a **+1 die bonus** to Social rolls among those your celebrity impresses. \
        Drawback: Rolls to find or identify you in the mundane world gain a **+1 die bonus per dot**.',
    },
    {
        name: 'Fast Reflexes',
        cost: [1, 2, 3],
        category: 'Human',
        prerequisites: 'Wits 3+ or Dexterity 3+',
        effect: 'Gain **+1 Initiative per dot**.',
    },
    {
        name: 'Fast-Talking',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        tags: ['Style'],
        prerequisites: 'Manipulation 3+, Subterfuge 2+',
        effect: 'You talk circles around listeners, leaving targets reeling but agreeing.\
        \n(•) Always Be Closing: Mark contests/resists your Social interaction: apply a **-1 penalty to their Resolve or Composure**.\
        \n(••) Jargon: Apply one relevant Specialty to any Social roll, even if the Specialty isn\'t tied to the Skill in use.\
        \n(•••) Devil\'s Advocacy: Reroll one failed Subterfuge roll per scene.\
        \n(••••) Salting: When you open a Door using conversation, spend 1 Willpower to immediately open another Door.\
        \n(•••••) Patron\'s Privilege: If the target regains Willpower (Vice/similar trait) while you are present, immediately roll Manipulation + Subterfuge to open a Door.',
    },
    {
        name: 'Fighting Finesse',
        cost: [2],
        category: 'Human',
        prerequisites: 'Dexterity 3+, a Specialty in Weaponry or Brawl',
        effect: 'Choose a Specialty in Weaponry or Brawl. You may **substitute your Dexterity for your Strength** when making \
        rolls with that Specialty. Can be purchased multiple times for different Specialties.',
    },
    {
        name: 'Fixer',
        cost: [2],
        category: 'Human',
        prerequisites: 'Contacts 2+, Wits 3+',
        effect: 'You know people who know people. When hiring a service (p. 325), reduce the **Availability score of the service by one dot**.',
    },
    {
        name: 'Fleet of Foot',
        cost: [1, 2, 3],
        category: 'Human',
        prerequisites: 'Athletics 2+',
        effect: 'Gain +1 Speed per dot, and anyone pursuing your character suffers a -1 per dot to any foot chase rolls.',
    },
    {
        name: 'Giant',
        cost: [3],
        category: 'Human',
        effect: 'Your character is massive. She\'s well over six feet tall, and crowds part when she approaches. She\'s **Size 6**, and gains **+1 Health**. This is normally only available at character creation. Drawback: Buying clothing is a nightmare. Fitting into small spaces is difficult at best.',
    },
    {
        name: 'Inspiring',
        cost: [3],
        category: 'Human',
        prerequisites: 'Presence 3+',
        effect: 'Your character\'s passion inspires those around her to greatness. Make a **Presence + Expression roll**. A small group of listeners levies a -1 penalty, a small crowd a -2, and a large crowd a -3. Listeners gain the **Inspired Condition**. The character may not use this Merit on herself.',
    },
    {
        name: 'Interdisciplinary Specialty',
        cost: [1],
        category: 'Human',
        prerequisites: 'Skill 3+ with a Specialty',
        effect: 'Choose a Specialty that your character possesses when you purchase this Merit. You can apply the **+1 from that Specialty** on any Skill with at least one dot, provided it\'s justifiable within the scope of the fiction. For example, a doctor with a Medicine Specialty in Anatomy may be able to use it when targeting a specific body part with Weaponry.',
    },
    {
        name: 'Iron Stamina',
        cost: [1, 2, 3],
        category: 'Human',
        prerequisites: 'Stamina 3+ or Resolve 3+',
        effect: 'Each dot eliminates a negative modifier (on a one-for-one basis) when resisting the effects of **fatigue or injury**. \
        This Merit counteracts the effects of wound penalties. For example, if all Health boxes are filled (normally a -3 penalty) and \
        you have Iron Stamina •, reduce those penalties to -2. This Merit cannot be used to gain positive modifiers, only to cancel negative ones.',
    },
    {
        name: 'Language',
        cost: [1],
        category: 'Human',
        effect: 'Your character is skilled with an **additional language**, beyond her native tongue. Your character can speak, read, and write in that language. \
        Choose a new language each time you buy this Merit.',
    },
    {
        name: 'Library',
        cost: [1, 2, 3],
        category: 'Human',
        tags: ['Motley'],
        effect: 'Your character has access to a plethora of information about a given topic. When purchasing, choose a **Mental Skill**. The Library covers that purview. \
        On any **extended roll** involving the Skill in question, add the dots in this Merit. Can be purchased multiple times for different Skills.',
    },
    {
        name: 'Lucid Dreamer',
        cost: [2],
        category: 'Human',
        prerequisites: 'Non-changeling, Resolve 3+',
        effect: 'Your character can roll to **enter the Gate of Ivory** when he sleeps, as a changeling does (p. 215). He can\'t engage in oneiromancy, \
        but if successful, he knows he\'s dreaming and can physically wake voluntarily as the Lost do.',
    },
    {
        name: 'Mentor',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        effect: 'This Merit gives your character a teacher who provides advice and guidance. He acts on your character\'s behalf, often in the background. \
        The dot rating determines the Mentor\'s capabilities and the extent of their aid. You must establish what the Mentor wants in return. \
        Choose three Skills (one can be Resources) the Mentor possesses. Once per session, you may ask the Mentor for a favor related to one of those Skills/Resources. \
        If a roll is required, the Mentor is automatically considered to have **successes equal to his dot rating**.',
    },
    {
        name: 'Parkour',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        tags: ['Style'],
        prerequisites: 'Dexterity 3+, Athletics 2+',
        effect: 'Your character is a trained and proficient free runner.\
        \n(•) Flow: When in a foot chase, **subtract your Parkour rating from the successes needed to pursue or evade**. Ignore environmental penalties to Athletics rolls equal to your Parkour rating.\
        \n(••) Cat Leap: When rolling Dexterity + Athletics to mitigate falling damage, gain **one automatic success**. Add your Parkour rating to the damage threshold that can be removed.\
        \n(•••) Wall Run: When climbing, scale **10 feet + five feet per dot of Athletics** as an instant action (instead of the normal 10 feet).\
        \n(••••) Expert Traceur: Spend 1 Willpower to designate one Athletics roll to run, jump, or climb as a **rote action**. You may not apply your Defense on the turn this is used.\
        \n(•••••) Freeflow: After successfully meditating (p. 170), take **Athletics actions reflexively once per turn**. When spending 1 Willpower on an Athletics roll in a foot chase, gain **three successes instead of three dice**.',
    },
    {
        name: 'Professional Training',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        effect: 'Your character has extensive training in a chosen profession. Mark two Asset Skills when chosen. The advantages relate directly to these skills.\
        \n(•) Networking: Gain **two dots of Contacts** relating to the chosen field.\
        \n(••) Continuing Education: When making a roll with her Asset Skills, she benefits from the **9-again quality**.\
        \n(•••) Breadth of Knowledge: Choose a **third Asset Skill**, and take **two Specialties** in your character\'s Asset Skills.\
        \n(••••) On-the-Job Training: Take a **Skill dot in an Asset Skill**. Whenever you purchase a new Asset Skill dot, take a Beat.\
        \n(•••••) The Routine: Before rolling, spend 1 Willpower point to apply the **rote action quality** to an Asset Skill.',
    },
    {
        name: 'Pusher',
        cost: [1],
        category: 'Human',
        prerequisites: 'Persuasion 2+',
        effect: 'Your character tempts and bribes as second nature. Any time a mark in a Social interaction accepts his soft leverage \
        (p. 193), **improve his Impression as if he\'d satisfied her Vice as well** (in addition to the usual chart movement).',
    },
    {
        name: 'Resources',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        tags: ['Motley'],
        effect: 'This Merit reflects your character\'s disposable income. Dot ratings range from (•) spending money to (•••••) filthy rich. \
        Once per chapter, your character can procure an item at her Resources level or lower **without issue** (Availability rating, p. 322). \
        Procuring an item one Availability above her Resources reduces her effective Resources by one dot for a full month. \
        Items two Availability below her Resources can be procured without limit (within reason).',
    },
    {
        name: 'Retainer',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        tags: ['Motley'],
        effect: 'Your character has an assistant, sycophant, servant, or follower. The dot rating reflects the Retainer\'s relative **competency**.\
        \n(•) Mildly useful, mostly for menial tasks.\
        \n(•••) A professional in his field.\
        \n(•••••) One of the best in his class.\
        \nIf the Retainer needs to make a roll within his field, use **double the Merit dot rating as a dice pool**. \
        For anything else, use the dot rating as a dice pool. Can be purchased multiple times for additional Retainers.',
    },
    {
        name: 'Safe Place',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        tags: ['Motley'],
        effect: 'Your character has a secure place in the mundane world. The dot rating reflects the security and size (e.g., •=minor security; •••••=security crew, infrared scanners). \
        \nAll owners gain an **Initiative bonus equal to the total Merit dots** while inside. \
        \nEfforts to breach the Safe Place suffer a **penalty equal to the Merit dots**. \
        \nIf desired, the Safe Place can include traps causing lethal damage equal to Merit dots,\
         or bashing damage equal to twice the Merit dots. Traps may be avoided with a Dexterity + Larceny roll penalized by the Safe Place rating.',
    },
    {
        name: 'Small-Framed',
        cost: [2],
        category: 'Human',
        effect: 'Your character is diminutive (not even five feet tall). He is **Size 4** and thus has **one fewer Health box**.\
        He gains **+2 to any rolls to hide or go unnoticed**, and this bonus may apply any time being smaller would be an advantage. \
        This is normally only available at character creation. \
        Drawback: Some people might overlook your character or not take him seriously.',
    },
    {
        name: 'Staff',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        tags: ['Motley'],
        effect: 'Your character has a crew of workers or assistants (housekeepers, thugs, etc.). For every dot, choose one type of assistant and **one Skill**. \
        At any reasonable time, her staff can take actions using that Skill, automatically garnering a **single success on minor, mundane activities**.',
    },
    {
        name: 'Status',
        cost: [1, 2, 3, 4, 5],
        category: 'Human',
        tags: ['Motley'],
        effect: 'Your character or Motley has standing, membership, authority, or respect from a chosen **group or organization**.\
        \n(1) Your character can **apply her Status to any Social roll** with those over whom she has authority or sway (within the group).\
        \n(2) She has access to **group facilities, resources, and funding** (subject to limits/red tape).\
        \nEach instance reflects a different group. \
        Drawback: Status requires **upkeep and regular duties**. If not upheld, the Status dots are inaccessible until re-established.',
    },
    {
        name: 'Striking Looks',
        cost: [1, 2],
        category: 'Human',
        effect: 'Your character is stunning, alarming, commanding, or otherwise worthy of attention. Determine how people react to them.\
        \nFor one dot, gain **+1** on any **Social rolls that their looks would influence** (Expression, Intimidation, Persuasion, Subterfuge, etc.). \
        For two dots, gain **+2** on these rolls.\
        \nDrawback: Any rolls to spot, notice, or remember your character gain the **same dice bonus**.',
    },
    {
        name: 'Sympathetic',
        cost: [2],
        category: 'Human',
        effect: 'Your character has a pitiful face or well-honed sob story, making it easy for others to get close. At the beginning of a **Social maneuvering attempt**, \
        you may accept a Condition such as **Leveraged or Swooned to immediately eliminate two of the subject\'s Doors**.',
    },
    {
        name: 'Trained Observer',
        cost: [1, 3],
        category: 'Human',
        prerequisites: 'Wits 3+ or Composure 3+',
        effect: 'Your character catches tiny details and digs for secrets. Any time you make a **Perception roll** (usually Wits + Composure):\
        \n(•) You benefit from the **9-again quality**.\
        \n(•••) You benefit from the **8-again quality**.',
    },
    {
        name: 'True Friend',
        cost: [3],
        category: 'Human',
        effect: 'Your character has a true friend—a deeply trusting relationship that cannot be breached. \
        The Storyteller **cannot kill this True Friend as part of a plot without your express permission**. \
        Any rolls to influence the True Friend against your character suffer a **-5 dice penalty**. In addition,\
         once per story your character can **regain one spent Willpower** by having a meaningful interaction with her True Friend.',
    }
];
