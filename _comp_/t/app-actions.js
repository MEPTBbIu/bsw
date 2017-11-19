import * as types from "./actions-types";
export var AppActions;
(function (AppActions) {
    AppActions.startApp = () => ({
        type: types.APP_START_KICKED
    });
    AppActions.setAppStarted = () => ({
        type: types.APP_STARTED
    });
    AppActions.failAppStartup = (reason) => ({
        type: types.APP_START_FAILED,
        reason: reason
    });
    AppActions.setAppIdle = () => ({
        type: types.APP_SET_IDLE_STATE
    });
    AppActions.setAppView = (view) => ({
        type: types.APP_SET_VIEW,
        view: view
    });
    AppActions.wakeupApp = () => {
        return (dispatch) => {
            dispatch({ type: types.APP_WAKEUP });
        };
    };
})(AppActions || (AppActions = {}));
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/actions/app-actions.js.map