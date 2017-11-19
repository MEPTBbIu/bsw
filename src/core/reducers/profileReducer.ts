
import * as types from "../actions/actions-types";
import {initialState } from "./initialState";
import { ProfileActionT } from "../actions";

import * as Redux from "redux";
import { IProfileState  } from "../store";

export const INITIAL_STATE: IProfileState = {
	firstName: undefined,
	lastName: undefined,
	midName: undefined,
	phone: undefined,
	hasChildren: undefined,
	activationDate: undefined,
	birthday: undefined,
	birthDate: undefined,
	createdDate: undefined,
	gender: undefined,
	email: undefined,
	phoneInfo: {},
	regCode: undefined,
	smsCode: undefined,
	termsOfPDU: false,
	status: {
		isLoading: false,
		phoneIsVerified: false,
		regCodeIsVerified:false
	},
//	regCodeIsVerified: false,
//	phoneIsVerified: false,
	isVerified: false,
	error: undefined
	//isLoading: false,
	

};

const profileReducer: Redux.TypedReducer<IProfileState, ProfileActionT> =
	( state = INITIAL_STATE, action) => {

		switch (action.type) {
		case types.PROFILE_LOAD_FAILED:	
			return  { ...state, status: "error loading" };
		case types.PROFILE_LOADED:
		case types.PROFILE_CHANGED:

			//let phoneInfo = {.phoneInfo};
			//phoneInfo.region = {...action.payload.phoneInfo.region};
			//console.log({...state},  action);
			return { ...state, ...action.profile };

		case types.PROFILE_LOAD:
		case types.PROFILE_LOAD_STARTED:
		default:
			return state;
		}
	};

export default profileReducer;