import { combineReducers } from '@reduxjs/toolkit';
import seemingReducer from './seemingSlice';
import kithReducer from './kithSlice';
import conceptReducer from './conceptSlice';
import attributeSlice from './attributeSlice';
import skillReducer from './skillSlice';
import specialtyReducer from './specialtySlice';
import meritSlice from './meritSlice';

const builderReducer = combineReducers({
    concept: conceptReducer,
    attributes: attributeSlice,
    skills: skillReducer,
    seeming: seemingReducer,
    kith: kithReducer,
    specialties: specialtyReducer,
    merits: meritSlice,
});

export default builderReducer;
