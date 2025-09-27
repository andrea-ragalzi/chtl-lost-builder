import { combineReducers } from '@reduxjs/toolkit';
import seemingReducer from './seemingSlice';
import kithReducer from './kithSlice';
import conceptReducer from './conceptSlice';
import attributeSlice from './attributeSlice';
import skillReducer from './skillSlice';
import specialtyReducer from './specialtySlice';
import meritSlice from './meritSlice';
import characterDetailsSlice from './characterDetailsSlice';
import healthTrackReducer from './healthTrackSlice'; // Importa healthTrackReducer
import willpowerSlice from './willpowerSlice';

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
    willpower: willpowerSlice
});

export default characterReducer;
