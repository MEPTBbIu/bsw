import appReducer from './appReducer';
import profileReducer_ from "./profileReducer";
import * as fsaProfile from "../fsa-profile";
import idleTime from "./idletime-reducer";

import { RootActionT } from "../actions";
import { RootState } from '../store';

import { combineReducers } from 'redux';
import phoneInfoReducer = fsaProfile.phoneInfoReducer;


const rr = {
	app: appReducer,
	profile: fsaProfile.reducer,
	idleTime: idleTime.reducer,
	//phoneInfoReducer: phoneInfoReducer
};

const rootReducer = combineReducers<RootState, RootActionT>(rr);
/*
	app: appReducer,
	profile: profileReducer,
	idleTime: idleTimeReducer
*/
export default rootReducer;
	//	form: formReducer,
	//routing: routerReducer,

//import {reducer as formReducer} from 'redux-form';
//import { routerReducer, RouterState } from 'react-router-redux';