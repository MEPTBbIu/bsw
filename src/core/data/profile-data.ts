

export interface IPhoneRegion {
	code?: string|null;
	name?: string|null;
}

export interface IPhoneInfo {
	error?: string|null;
	country?: string|null;
	region?: IPhoneRegion|null;
	operator?: string|null;
	text?: string|null;
	full?: string|null;
	icon?: string|null;
}

export interface ICustomerProfile {
	//fullName?: string | null;
	firstName?: string | null;	//
	lastName?: string | null;	//
	midName?: string | null;   //
	birthday?: Date|string|null;		 //
	birthDate?: Date | string | null;
	gender?: "male" | "female" | "";
	hasChildren?: boolean | null;
	email?: string | null;
	phone?: string | null;
	phoneInfo?: IPhoneInfo;
	//loyaltyCardId: string | null;
	regCode?: string | null;
	smsCode?: string | null;
	createdDate?: Date|string | null;
	activationDate?: Date| string | null;
	termsOfPDU?: boolean | null;
	//status?: string | null|Object;
	isVerified?: boolean | null;
}



 /*
export interface ICustomerProfileState extends Partial<ICustomerProfile> {
	regCodeIsValid?: boolean;
	phoneIsValid?: boolean;
}	 */