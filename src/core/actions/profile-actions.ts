import * as types from "./actions-types";
import Api from "../../common/api-http1c";
import { IProfileState } from "../store";
import { Action, Dispatch } from "redux";



export interface IProfileActionTyped extends Action {
	type: types.PROFILE_ACTIONS_TYPE;
}

export type ProfileAction = Action & IProfileState;


export interface IProfileLoadAction {
	type: types.PROFILE_LOAD;
};

export type ProfileLoadAction = IProfileLoadAction;

export interface IProfileLoadStartedAction {
	type: types.PROFILE_LOAD_STARTED;
};

export type ProfileLoadStartedAction = IProfileLoadStartedAction;

export interface IProfileLoadFailedAction {
	type: types.PROFILE_LOAD_FAILED;
	reason: string;
};
export type ProfileLoadFailedAction = IProfileLoadFailedAction;


export interface IProfileLoadedAction {
	type: types.PROFILE_LOADED;
	profile: IProfileState;
};
export type ProfileLoadedAction =IProfileLoadedAction;

export interface IProfileChangedAction {
	type: types.PROFILE_CHANGED;
	profile: IProfileState;
};
export type ProfileChangedAction = IProfileChangedAction;


export namespace ProfileActions {
	export const updateProfileData = ( data: IProfileState): ProfileChangedAction => ({
		type: types.PROFILE_CHANGED,
		profile: { ...data }
	});

	export const startProfileLoad = (): ProfileLoadAction => ({
		type:types.PROFILE_LOAD
	});

	export const setProfileLoadStarted = (): ProfileLoadStartedAction => ({
		type: types.PROFILE_LOAD_STARTED
	});

	export const setProfileLoaded = ( data: IProfileState): ProfileLoadedAction => ({
		type: types.PROFILE_LOADED,
		profile: { ...data }
	});

	export const setProfileLoadFail = (reason: string): ProfileLoadFailedAction => ({
		type: types.PROFILE_LOAD_FAILED,
		reason: reason
	});

	export const loadProfileAsync = (regCode) => {
		return (dispatch: Dispatch<any>) => {
			dispatch(setProfileLoadStarted());
			return Api.loadProfileAsync(regCode)
				.then(
					(data) => {
						//data.phone = normalizePhone(data.phone);
						dispatch(setProfileLoaded(data));
					});
		}
	}
}

//export const ProfileActions = ProfileActions;

type ProfileActionType = { (...params): ProfileActionT | Dispatch<any> };

export type ProfileActionsT =
	{[TI in keyof typeof ProfileActions]?: ProfileActionType};
export const ProfileActionsAll: ProfileActionsT = { ...ProfileActions };

//export type ProfileActions = ProfileActions;

export type ProfileActionT = IProfileLoadFailedAction
							| IProfileLoadedAction
							| IProfileLoadStartedAction
							| IProfileChangedAction
							| IProfileLoadAction;