import { RootState } from '../store';
import idleTtime from "./idletime-reducer";
import * as fsaProfile from "../fsa-profile";
import * as app from "./appReducer";


export const initialState: RootState = {
	app: {
		status: 'Initial',
		lastUpdatedOn: new Date(),
		currentView: "Promo"
	},
	idleTime: idleTtime.INITIAL_STATE,
	profile: fsaProfile.INITIAL_STATE
};

export default initialState;