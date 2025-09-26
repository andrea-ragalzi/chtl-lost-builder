import { combineReducers } from '@reduxjs/toolkit';
import seemingReducer from './seemingSlice';
import kithReducer from './kithSlice';
import conceptReducer from './conceptSlice';
import attributeSlice from './attributeSlice';
import skillReducer from './skillSlice';
import specialtyReducer from './specialtySlice';
import meritSlice from './meritSlice';
import characterDetailsSlice from './characterDetailsSlice';

const characterReducer = combineReducers({
    characterDetails: characterDetailsSlice,
    concept: conceptReducer,
    attributes: attributeSlice,
    skills: skillReducer,
    seeming: seemingReducer,
    kith: kithReducer,
    specialties: specialtyReducer,
    merits: meritSlice,
});

export default characterReducer;
