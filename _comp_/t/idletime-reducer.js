import * as types from "../actions/actions-types";
export const INITIAL_STATE = {
    idleDuration: 0,
    timerId: null,
    callback: null
};
export const reducer = (state = INITIAL_STATE, action) => {
    const A = action;
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
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/reducers/idletime-reducer.js.map