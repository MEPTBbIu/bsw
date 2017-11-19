import idleTtime from "./idletime-reducer";
import * as fsaProfile from "../fsa-profile";
export const initialState = {
    app: {
        status: 'Initial',
        lastUpdatedOn: new Date(),
        currentView: "Promo"
    },
    idleTime: idleTtime.INITIAL_STATE,
    profile: fsaProfile.INITIAL_STATE
};
export default initialState;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/reducers/initialState.js.map