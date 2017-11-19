import * as Redux from 'redux';
import * as types from "../actions/actions-types";

import { IdleTimeActionT, IdleTimeState, IdleTimeAction } from "../actions/idletime-actions";


export const INITIAL_STATE: IdleTimeState = {
	idleDuration: 0,
	timerId: null,
	callback: null
};


export const reducer: Redux.TypedReducer<IdleTimeState, IdleTimeActionT> =
	( state: IdleTimeState = INITIAL_STATE, action: IdleTimeAction ) => {

		const A = action as IdleTimeAction;

		switch (action.type) {
		case types.IDLE_TIME_SET_DURATION:
			return { ...state, ...A };
		case types.IDLE_TIME_RESTART_TIMER:
			return { ...state, timerId: A.timerId };

		default:
			return state;
		}
	};


export default { reducer, INITIAL_STATE };
