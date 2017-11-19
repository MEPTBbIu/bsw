import * as Fsa from './fsa';
import Api from '../common/Api';
import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { bindThunkAction } from 'typescript-fsa-redux-thunk';
const actionCreator = actionCreatorFactory();
export const INITIAL_STATE = {
    firstName: null,
    lastName: null,
    midName: null,
    phone: null,
    hasChildren: null,
    activationDate: null,
    birthday: new Date(Date.now()).toDateString(),
    birthDate: new Date(Date.now()),
    createdDate: null,
    gender: null,
    email: null,
    phoneInfo: {
        country: null,
        error: null,
        full: null,
        icon: null,
        operator: null,
        region: { code: null, name: null },
        text: null
    },
    regCode: null,
    smsCode: null,
    termsOfPDU: false,
    status: null,
    regCodeIsVerified: false,
    phoneIsVerified: false,
    isLoading: false,
    isVerified: false
};
export const acUpdateProfile = actionCreator('PROFILE_UPDATE');
function updateProfileHandler(state, profile) {
    return { ...state, ...profile };
}
export const aacLoadProfile = actionCreator.async('PROFILE_LOAD');
export const wLoadProfile = Fsa.FsaWrapAsyncWorker(aacLoadProfile, (regCode) => Api.loadProfileAsync(regCode));
const loadProfileHandlers = {
    started: (state, regCode) => ({ ...state, regCode: regCode, regCodeIsVerified: false }),
    done: (state, payload) => ({ ...state, ...payload.result, isLoading: false }),
    failed: (state, payload) => ({ ...state, error: payload.error, isLoading: false })
};
export const aacGetPhoneInfo = actionCreator.async('GET_PHONE_INFO');
export const wGetPhoneInfo = bindThunkAction(aacGetPhoneInfo, async (phone, dispatch, getState) => {
    const state = getState();
    const phoneInfo = await Api.validatePhoneInputAsync(phone);
    if (phoneInfo.error !== 'ok') {
        throw new Error(`Server error: ${phoneInfo.error}`);
    }
    const newProfileState = { phoneInfo: { ...state.profile.phoneInfo, ...phoneInfo, region: { ...phoneInfo.region } } }, res = { ...state.profile, ...newProfileState };
    return res;
});
const getPhoneInfoHandlers = {
    started: (state, phone) => ({ ...state, phoneInfo: { ...INITIAL_STATE.phoneInfo } }),
    done: (state, payload) => ({ ...state, ...payload.result }),
    failed: (state, payload) => ({ ...state, ...payload.error })
};
export const reducer = reducerWithInitialState(INITIAL_STATE)
    .case(acUpdateProfile, updateProfileHandler)
    .case(aacLoadProfile.started, loadProfileHandlers.started)
    .case(aacLoadProfile.done, loadProfileHandlers.done)
    .case(aacLoadProfile.failed, loadProfileHandlers.failed)
    .case(aacGetPhoneInfo.started, getPhoneInfoHandlers.started)
    .case(aacGetPhoneInfo.done, getPhoneInfoHandlers.done)
    .case(aacGetPhoneInfo.failed, getPhoneInfoHandlers.failed);
export default { reducer, INITIAL_STATE };
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/fsa-profile.js.map