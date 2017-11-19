import { IPhoneInfo, IPhoneRegion } from "./data/profile-data";
import * as Fsa from "./fsa";
import Api from "../common/api-http1c";
import { actionCreatorFactory } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { IProfileState, IProfileStatus, RootState }from './store';


import {bindThunkAction}from 'typescript-fsa-redux-thunk';

export type ERR = string | Object | boolean | null;

const actionCreator = actionCreatorFactory();


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
	phoneInfo: {
		country: undefined,
		error: undefined,
		full: undefined,
		icon: undefined,
		operator: undefined,
		region: {
			code: undefined,
			name: undefined
		} as IPhoneRegion,
		text: undefined
	} as IPhoneInfo,
	regCode: undefined,
	smsCode: undefined,
	termsOfPDU: false,
	status: {
		regCodeIsVerified: false,
		phoneIsVerified: undefined,
		isLoading: false,
	} as IProfileStatus,

	isVerified: false,
	error: undefined


};


/**
 * LOAD PROFILE
 */
export const acUpdateProfile = actionCreator<IProfileState>('PROFILE_UPDATE');

/**
 *
 *
 * @param {IProfileState} state
 * @param {IProfileState} profile
 * @returns {IProfileState}
 */
function updateProfileHandler(state: IProfileState, profile: IProfileState): IProfileState {
	return { ...state, ...profile };
}

export const acChangeRegCode = actionCreator<string>('PROFILE_CHANGE_REGCODE');

function changeRegCode(state: RootState, regCode: string): RootState {
	return {
		...state,
		profile: { ...state.profile, regCode: regCode }
	};
}

/**
 * LOAD PROFILE
 */

// Handler < InS extends OutS, OutS, P > = ( state: InS, payload: P ) => OutS
export const aacLoadProfile = actionCreator.async<string, IProfileState, string>('PROFILE_LOAD');

export const wLoadProfile = Fsa.FsaWrapAsyncWorker<string, IProfileState, {}>(aacLoadProfile,
	(regCode): Promise<IProfileState> => Api.loadProfileAsync(regCode));

const loadProfileHandlers: Fsa.IFsaAsynchHandlers<IProfileState & {}, IProfileState, string, string> = {
	started: (state, regCode) => ({
		...state,
		regCode: regCode,
		status: {
			regCodeIsVerified: false,
			isLoading: true,
			phoneIsVerified: undefined
		} as IProfileStatus,
		error: false
	}),
	done: (state, payload) => ({
		...state,
		...payload.result
	}),
	failed: (state, payload) => ({ ...state, ...payload.error as IProfileState })
};


// PHONE INFO
// specify parameters and result shapes as generic type arguments
export const aacGetPhoneInfo =
	actionCreator.async<RootState, string, IPhoneInfo, IPhoneInfo>('GET_PHONE_INFO');

export const wGetPhoneInfo =
	Fsa.FsaWrapAsyncWorker<string, IProfileState & {}, IProfileState & {}>(aacGetPhoneInfo,
		(phone): Promise<IPhoneInfo> => Api.validatePhoneInputAsync(phone));


const getPhoneInfoHandlers: Fsa.IFsaAsynchHandlers<IProfileState & {}, IProfileState & {}, string, IPhoneInfo> = {
	started: (state, phone) => ({
		...state,
		phoneInfo: { ...INITIAL_STATE.phoneInfo },
		status: {
			...state.status,

			phoneIsVerified: false
		}
	}),
	done: (state, payload) => {
		const phoneInfo: IPhoneInfo = payload.result;
		if (phoneInfo.error !== 'ok') {
			throw new Error(`Server error: ${phoneInfo}`);
		}
		const newIProfileState = {
			...state,
			phoneInfo: {
				...state.phoneInfo,
				...phoneInfo,
				region: { ...state.phoneInfo.region, ...phoneInfo.region }
			},
			status: {
				...state.status,

				phoneIsVerified: true
			}
		};

		return newIProfileState;

	},
	failed: (state, payload) => ({
		...state,
		phoneInfo: { ...state.phoneInfo, ...payload.error },
		status: {
			...state.status,

			phoneIsVerified: false
		}
	})
};
// USE 1


//const action =  store.dispatch(wGetPhoneInfo("79037477611"));
/*export const phoneInfoReducer =
	reducerWithInitialState<IPhoneInfo>( INITIAL_STATE.phoneInfo )
		.case( aacGetPhoneInfo.started, getPhoneInfoHandlers.started )
		.case( aacGetPhoneInfo.done, getPhoneInfoHandlers.done )
		.case( aacGetPhoneInfo.failed, getPhoneInfoHandlers.failed );	   */


export const reducer =
	reducerWithInitialState<IProfileState>(INITIAL_STATE)
		.case(acUpdateProfile, updateProfileHandler)
		//	.case(acChangeRegCode, changeRegCode )
		.case(aacLoadProfile.started, loadProfileHandlers.started)
		.case(aacLoadProfile.done, loadProfileHandlers.done)
		.case(aacLoadProfile.failed, loadProfileHandlers.failed)
		.case(aacGetPhoneInfo.started, getPhoneInfoHandlers.started)
		.case(aacGetPhoneInfo.done, getPhoneInfoHandlers.done)
		.case(aacGetPhoneInfo.failed, getPhoneInfoHandlers.failed);


export default { reducer, INITIAL_STATE };