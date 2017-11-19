import * as types from './actions-types';
import Api from "../../common/Api";
;
;
;
;
;
export var ProfileActions;
(function (ProfileActions) {
    ProfileActions.updateProfileData = (data) => ({
        type: types.PROFILE_CHANGED,
        profile: { ...data }
    });
    ProfileActions.startProfileLoad = () => ({
        type: types.PROFILE_LOAD
    });
    ProfileActions.setProfileLoadStarted = () => ({
        type: types.PROFILE_LOAD_STARTED
    });
    ProfileActions.setProfileLoaded = (data) => ({
        type: types.PROFILE_LOADED,
        profile: { ...data }
    });
    ProfileActions.setProfileLoadFail = (reason) => ({
        type: types.PROFILE_LOAD_FAILED,
        reason: reason
    });
    ProfileActions.loadProfileAsync = (regCode) => {
        return (dispatch) => {
            dispatch(ProfileActions.setProfileLoadStarted());
            return Api.loadProfileAsync(regCode)
                .then((data) => {
                dispatch(ProfileActions.setProfileLoaded(data));
            });
        };
    };
})(ProfileActions || (ProfileActions = {}));
export const ProfileActionsAll = { ...ProfileActions };
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/actions/profile-actions.js.map