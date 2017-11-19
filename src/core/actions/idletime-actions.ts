
import * as types from "./actions-types";
import { AppActions } from "./app-actions"
import { RootState } from "../store";
import { Dispatch, Action, Reducer } from "redux";

export interface IIdleTimeState {
	idleDuration?: number;
	timerId?: number;
	callback?: () => void;
}
export type IdleTimeState = IIdleTimeState;


export type IdleTimeAction = Action & IIdleTimeState;


export type IdleTimeSetDurationAction = {
	type: types.IDLE_TIME_SET_DURATION;
	idleDuration: number;
	callback: any;
};

export type IdleTimeRestartTimerAction = {
	type: types.IDLE_TIME_RESTART_TIMER;
	timerId: number;
};


const setIdleTimeDuration = ( duration: number, callBack: any ): IdleTimeAction => ({
	type: types.IDLE_TIME_SET_DURATION,
	idleDuration: duration,
	callback: callBack
});


export namespace IdleTimeActions {
	export const restartIdleTimer = () => {
		return (dispatch, getState:Function) => {
			const state = getState() as RootState,
				{ timerId, idleDuration, callback } = state.idleTime;

			if (timerId !== null) window.clearTimeout(timerId);
			let newid = idleDuration > 0 ? window.setTimeout(callback, idleDuration) : null;
			dispatch({ type: types.IDLE_TIME_RESTART_TIMER, timerId: newid });
		};
	}


	export const setIdleTimeDurationA = (duration: number) => {
		return ( dispatch: Dispatch<IdleTimeAction>) => {
			const callback = (_dispatch?:Dispatch<IdleTimeAction>) => {
				dispatch(AppActions.setAppIdle());
				console.log("SET APP IDLE");
			};

			dispatch(setIdleTimeDuration(duration, ()=>callback(dispatch)));
			dispatch(restartIdleTimer());
		};
	};
}
////////////////////////////////////////

/*export type IdleTimeActionsT =
	{[TI in keyof typeof IdleTimeActions]?: { (...props): IdleTimeActionT | Dispatch<IdleTimeActionT> }};
export const IdleTimeActionsAll: IdleTimeActionsT = { ...IdleTimeActions };	 */

export type IdleTimeActionT = IdleTimeAction | IdleTimeSetDurationAction | IdleTimeRestartTimerAction;