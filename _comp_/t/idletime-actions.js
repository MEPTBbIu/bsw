import * as types from "./actions-types";
import { AppActions } from "./app-actions";
const setIdleTimeDuration = (duration, callBack) => ({
    type: types.IDLE_TIME_SET_DURATION,
    idleDuration: duration,
    callback: callBack
});
export var IdleTimeActions;
(function (IdleTimeActions) {
    IdleTimeActions.restartIdleTimer = () => {
        return (dispatch, getState) => {
            const state = getState(), { timerId, idleDuration, callback } = state.idleTime;
            if (timerId !== null)
                window.clearTimeout(timerId);
            let newid = idleDuration > 0 ? window.setTimeout(callback, idleDuration) : null;
            dispatch({ type: types.IDLE_TIME_RESTART_TIMER, timerId: newid });
        };
    };
    IdleTimeActions.setIdleTimeDurationA = (duration) => {
        return (dispatch) => {
            const callback = (_dispatch) => {
                dispatch(AppActions.setAppIdle());
                console.log("SET APP IDLE");
            };
            dispatch(setIdleTimeDuration(duration, () => callback(dispatch)));
            dispatch(IdleTimeActions.restartIdleTimer());
        };
    };
})(IdleTimeActions || (IdleTimeActions = {}));
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/actions/idletime-actions.js.map