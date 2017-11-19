import { ICustomerProfile } from "../data/profile-data";
import { IIdleTimeState } from "../actions";

export type ApplicationStatus = "Initial" | "Starting" | "Started" | "FailedToStart" | "Idle";
export type TView = "Promo" | "RegCodeInput" | "PhoneInput" | "Profile" | "EULA" | "CustomerCongratulations";

export type ViewMap = {[T in TView]?: () => React.ReactElement<any>};


export interface IAppState {
	readonly status?: ApplicationStatus;
	readonly lastUpdatedOn?: Date;
	readonly errorReason?: string;
	readonly currentView?: TView;
}
/*
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
//phoneInfo: {},
regCode: null,
smsCode: null,
termsOfPDU: false,
status: null,

phoneIsVerified: false,
regCodeIsVerified: false,
isLoading: false,
isVerified: false*/

export interface IProfileStatus extends  Object
{
	regCodeIsVerified?: boolean;
	phoneIsVerified?: boolean;
	isLoading?: boolean;
}

export interface IProfileState extends ICustomerProfile {
	status ?:   IProfileStatus ;
	error?: boolean | string | Object | null;
	sendedSMS?: string;
}

//export type ProfileState = IProfileState&{};
export type IdleTimeState = IIdleTimeState&{};
export type AppState = IAppState&{};

export type RootState = {
	app: AppState;
	idleTime: IdleTimeState ,
	profile: IProfileState,
};



//export const AppStore = AppStore;

export default RootState;
