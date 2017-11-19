import { Dispatch } from "redux";
import * as types from "./actions-types";
import { TView } from "../store";


export type AppStartKickedAction = {
	type: types.APP_START_KICKED;
};

export type AppStartedAction = {
	type: types.APP_STARTED;
};

export type AppStartFailedAction = {
	type: types.APP_START_FAILED;
	reason: string;
};

export type AppSetViewAction = {
	type: types.APP_SET_VIEW;
	view: TView;
};

export type AppSetIdleStateAction = {
	type: types.APP_SET_IDLE_STATE;

};

export type AppWakeupAction = {
	type: types.APP_WAKEUP;
};

export namespace AppActions {

	export const startApp: () => AppStartKickedAction = () => ({
		type: types.APP_START_KICKED
	});

	export const setAppStarted: () => AppStartedAction = () => ({
		type: types.APP_STARTED
	});

	export const failAppStartup: (reason: string) => AppStartFailedAction = (reason) => ({
		type: types.APP_START_FAILED,
		reason: reason
	});
	export const setAppIdle: () => AppSetIdleStateAction = () => ({
		type: types.APP_SET_IDLE_STATE

	});
	export const setAppView: (view: TView) => AppSetViewAction = (view) => ({
		type: types.APP_SET_VIEW,
		view: view
	} );
	export const idleApp = () => {
		return ( dispatch ) => {
			dispatch( { type: types.APP_SET_IDLE_STATE } );
			//	dispatch(setIdleTimeDurationA(80000));
		};
	};

	export const wakeupApp = () => {
		return (dispatch)=>  {
			dispatch({ type: types.APP_WAKEUP });
			//	dispatch(setIdleTimeDurationA(80000));
		};
	};

}

//export const AppActions = AppActions;

export type AppActionT = AppStartedAction
						| AppStartFailedAction
						| AppStartKickedAction
						| AppWakeupAction
						| AppSetViewAction
						| AppSetIdleStateAction;

//type KeyAppActions = keyof typeof AppActions;
/*export type TAppActions = {[TI in keyof typeof AppActions]?:
	{ (...props): AppActionT | Dispatch<any> } };
export const AppActionsAll: TAppActions = { ...AppActions }; */

//export as namespace AppActions;


/*};
};*/
//export type AppActions = { setAppView, wakeupApp, setAppIdle, startApp, setAppStarted, failAppStartup };