import type { SeemingDetails } from "../types/seemingType";

export const seemingData: SeemingDetails[] = [
    {
        value: 'beast',
        label: 'Beast',
        quote: "Live as a beast so you won't die like a lamb.",
        description: "You were transformed into a wild creature, forced to live by instinct alone. During your captivity, you were denied speech and self-awareness; the only thing that mattered was survival. Now, back in the human world, you'd rather be the hunter than the hunted. You value freedom and your 'pack' (your motley) above all else, refusing to ever be controlled again. Your fae form is often an unsettling mix of human and animal traits, like fangs, claws, or a feral posture.",
        bonus: "Gain +1 in one Resistance Attribute of your choice.",
        blessing: "You can deal lethal damage with your unarmed attacks and gain a +3 bonus to Initiative and Speed.",
        curse: "If you act without thinking and cause significant harm or complications to someone else, you risk losing Clarity.",
        image: '../../../public/images/seeming/beast.png'
    },
    {
        value: 'darkling',
        label: 'Darkling',
        quote: "The safest secret is to have none, unless you have something to hide.",
        description: "You learned to survive by disappearing into the darkness. You became a spy, a thief, or a guide for inaccessible places. Your strength lies in deception and stealth. Your form is a shadow of yourself, with glowing eyes or skin that seems to be made of darkness.",
        bonus: "Gain a +1 in an Attribute of your choice between Wits or Dexterity.",
        blessing: "You can become temporarily intangible.",
        curse: "If a secret you know turns out to be false, you risk losing Clarity.",
        image: '../../../public/images/seeming/darkling.png'
    },
    {
        value: 'elemental',
        label: 'Elemental',
        quote: "The essence of fire doesn't burn, it forges.",
        description: "You were fused with a natural element—fire, water, earth, or metal—or with nature itself. You became a force of nature, unstoppable and often unpredictable. Your fae form is a fusion of human traits and your element, like bark skin or hair made of flames.",
        bonus: "Gain a +1 in an Attribute of your choice between Presence or Stamina.",
        blessing: "You can move and act through your element.",
        curse: "If you are forced to do something you don't want to, you risk losing Clarity.",
        image: '../../../public/images/seeming/elemental.png'
    },
    {
        value: 'fairest',
        label: 'Fairest',
        quote: "Beauty has a price, but eternal beauty costs the soul.",
        description: "You were shaped to be a vision of beauty and grace, forced to serve as muses or living works of art. Your strength is your beauty and charisma, but you feel vulnerable and superficial. Your form is ethereal and enchanting, but with an unnatural or unsettling touch.",
        bonus: "Gain a +1 in an Attribute of your choice between Manipulation or Composure.",
        blessing: "You can use your Willpower to help another character.",
        curse: "If your actions harm your allies, you risk losing Clarity.",
        image: '../../../public/images/seeming/fairest.png'
    },
    {
        value: 'ogre',
        label: 'Ogre',
        quote: "Strength is not about never falling, but about getting up every time you fall.",
        description: "You were forged in violence, used as guards and warriors. You are incredibly strong and tough, but you feel clumsy and out of place among humans. Your form is massive and intimidating, with exaggerated features like powerful arms, stone-hard skin, or horns.",
        bonus: "Gain a +1 in an Attribute of your choice between Manipulation or Stamina.",
        blessing: "You can weaken an opponent with your attacks, inflicting the Beaten Down Condition.",
        curse: "If strangers are afraid of you, you risk losing Clarity.",
        image: '../../../public/images/seeming/ogre.png'
    },
    {
        value: 'wizened',
        label: 'Wizened',
        quote: "Wisdom is learned not from words, but from practice.",
        description: "You were forced to serve as an artisan, inventor, or servant. You have a brilliant mind and the hands of an artist, but your form can be fragile. Your fae form reflects your craft, like skin that looks like carved wood or eyes that resemble clock lenses.",
        bonus: "Gain a +1 in an Attribute of your choice between Intelligence or Dexterity.",
        blessing: "You can create unique objects by combining unconventional materials.",
        curse: "If you are taken off guard by an unpleasant surprise, you risk losing Clarity.",
        image: '../../../public/images/seeming/wizened.png'
    },
];