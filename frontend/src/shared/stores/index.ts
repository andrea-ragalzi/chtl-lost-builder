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
import narrativeReducer from './narrativeSlice';
import conditionReducer from './conditionSlice';
import wyrdReducer from './wyrdSlice';
import glamourReducer from './glamourSlice';
import clarityReducer from './claritySlice';

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
    narrative: narrativeReducer,
    conditions: conditionReducer,
    wyrd: wyrdReducer,
    glamour: glamourReducer,
    clarity: clarityReducer,
});

export default characterReducer;
