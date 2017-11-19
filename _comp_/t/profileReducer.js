import * as types from "../actions/actions-types";
export const INITIAL_STATE = {
    firstName: null,
    lastName: null,
    midName: null,
    phone: null,
    hasChildren: null,
    activationDate: null,
    birthday: null,
    birthDate: null,
    createdDate: null,
    gender: null,
    email: null,
    regCode: null,
    smsCode: null,
    termsOfPDU: false,
    status: null,
    regCodeIsVerified: false,
    phoneIsVerified: false,
    isVerified: false,
    isLoading: false
};
const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.PROFILE_LOAD_FAILED:
            return { ...state, status: "error loading" };
        case types.PROFILE_LOADED:
        case types.PROFILE_CHANGED:
            return { ...state, ...action.profile };
        case types.PROFILE_LOAD:
        case types.PROFILE_LOAD_STARTED:
        default:
            return state;
    }
};
export default profileReducer;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/reducers/profileReducer.js.map