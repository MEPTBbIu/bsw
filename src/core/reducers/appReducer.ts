/// <reference path="../../augmentations.d.ts" />
import * as React from "react";
import * as Redux from "redux";
import * as types from "../actions/actions-types";


import { initialState } from "./initialState";
import { AppState }  from "../store/store";
import { AppActionT } from "src/core/actions/app-actions";

const appReducer: Redux.TypedReducer<AppState, AppActionT> =
	( state = initialState.app, action ) => {
		const  A = action as AppActionT;
		switch (action.type) {
		case types.APP_START_KICKED:
			return {
				...state,
				status: "Starting",
				lastUpdatedOn: new Date()
			}

		case types.APP_STARTED:
			return {
				...state,
				status: "Started",
				lastUpdatedOn: new Date()
			}

			case types.APP_START_FAILED:
				
				return {
					...state,
					status: "FailedToStart",
					lastUpdatedOn: new Date(),
					errorReason: A.reason
			}
			case types.APP_SET_IDLE_STATE:
			return {
				...state,
				currentView: "Promo",
				status: "Idle"
			}

		case types.APP_SET_VIEW:
			return {
				...state,
				currentView: A.view
			}

		case types.APP_WAKEUP:
			return {
				...state,
				currentView: "Profile",
				status: "Started"
			}

		default:
			return state;
		}
	};

export default appReducer;