import { combineReducers } from '@reduxjs/toolkit';
import seemingReducer from './seemingSlice';
import kithReducer from './kithSlice';
import conceptReducer from './conceptSlice';
import attributeSlice from './attributeSlice';
import skillReducer from './skillSlice';
import specialtyReducer from './specialtySlice';
import meritSlice from './meritSlice';
import characterDetailsSlice from './characterDetailsSlice';
import healthTrackReducer from './healthTrackSlice';
import willpowerReducer from './willpowerSlice';
import conditionReducer from './conditionSlice';
import wyrdReducer from './wyrdSlice';
import glamourReducer from './glamourSlice';
import clarityReducer from './claritySlice';
import contractsSlice from './contractsSlice';
import goblinDebtsSlice from './goblinDebtSlice';
import pledgeSlice from './pledgeSlice';
import faeMountSlice from './faeMountSlice';
import mantleSlice from './mantleSlice';
import hollowSlice from './hollowSlice';
import tokenSlice from './tokenSlice';
import combatSlice from './combatSlice';
import favoredRegaliaSlice from './favoredRegaliaSlice';
import frailtiesSlice from './frailtiesSlice';
import touchstonesSlice from './touchstonesSlice';
import aspirationsSlice from './aspirationsSlice';
import experienceSlice from './experienceSlice';
import profileSlice from './profileSlice';

const characterReducer = combineReducers({
    characterDetails: characterDetailsSlice,
    concept: conceptReducer,
    attributes: attributeSlice,
    skills: skillReducer,
    seeming: seemingReducer,
    kith: kithReducer,
    specialties: specialtyReducer,
    merits: meritSlice,
    healthTrack: healthTrackReducer,
    willpower: willpowerReducer,
    conditions: conditionReducer,
    wyrd: wyrdReducer,
    glamour: glamourReducer,
    clarity: clarityReducer,
    contracts: contractsSlice,
    goblinDebt: goblinDebtsSlice,
    pledges: pledgeSlice,
    faeMounts: faeMountSlice,
    mantles: mantleSlice,
    hollows: hollowSlice,
    tokens: tokenSlice,
    combat: combatSlice,
    favoredRegalia: favoredRegaliaSlice,
    frailties: frailtiesSlice,
    touchstones: touchstonesSlice,
    aspirations: aspirationsSlice,
    experience: experienceSlice,
    profile: profileSlice
});

export default characterReducer;
