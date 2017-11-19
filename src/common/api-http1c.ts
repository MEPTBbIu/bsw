import AJAX from "./ts-ajax";
import { ICustomerProfile, IPhoneInfo } from "../core/data/profile-data";
import { IProfileState } from "../core/store";
/// <reference path="../globals.d.ts" />



export interface ISMSCodeResult {
	smsId?: string;
	code?: string;
}

/*export interface IPhoneInfo {
	error?: string;
	country?: string; // "Россия",
	region?: {
		code?: string; // "77",
		name?: string; // "Москва и Московская область"
	};
	operator?: string; // "Мобильные ТелеСистемы",
	text?: string; // "Россия, Москва и Московская область, Мобильные ТелеСистемы",
	full?: string;  // "Страна: Россия<br>Регион: Москва и Московская область (77)<br>Оператор: Мобильные ТелеСистемы",
	icon?: string;  // "//gsm-inform.ru/api/info/icons/mts.png"
}  */

interface ILoadProfileResult{
	success: boolean; error: string;
	data: ICustomerProfile;
state: number;}



export default class Api {
	static validatePhoneInputAsync (phone: string): Promise<IPhoneInfo> {
		return new Promise<IPhoneInfo>((resolve, reject: (reasons: IPhoneInfo) => any) => {

			const url = `/bslo_retail/hs/loyalty/phone/validate/${phone}`;
			const ok = (response: XMLHttpRequest) => {
				let phoneInfo: IPhoneInfo = JSON.parse(response.responseText) as IPhoneInfo;

				resolve(phoneInfo);
			};

			const error = (err) => {
				reject(err as IPhoneInfo);
			};
			let headers = [{name: "Content-Type", value: "application/x-www-form-urlencoded"},
				{name: "Authorization", value: "Basic d3M6d3M="}];
			AJAX.httpGet({
					url: url,
					successCallback: ok,
					failureCallback: error,
					headers
				}
			);
		});
	}

	static sendSMSCodeAsync (phone: string): Promise<ISMSCodeResult> {
		return new Promise<ISMSCodeResult>((resolve, reject: (reasons: ISMSCodeResult) => any) => {

			const url = `/bslo_retail/hs/loyalty/sms/sendCode/${phone}`;
			const ok = (response: XMLHttpRequest) => {
				let res: ISMSCodeResult = JSON.parse(response.responseText) as ISMSCodeResult;

				//	res.smsId = res.smsId;
				resolve(res);

			};

			const error = (err) => {
				reject({} as ISMSCodeResult);
			};

			AJAX.httpGet({
				url: url,
				successCallback: ok,
				failureCallback: error,
				headers: [
					{name: "Content-Type", value: "application/x-www-form-urlencoded"},
					{name: "Authorization", value: "Basic d3M6d3M="}
				]
			});
		});
	}

	static loadProfileAsync(regCode: string): Promise<IProfileState> {
		return new Promise<IProfileState>((resolve, reject: (reasons: any) => any) => {

			const url = `/bslo_retail/hs/loyalty/reg/${regCode}`;
			const ok = (response: XMLHttpRequest) => {
				let data = JSON.parse( response.responseText ) as ILoadProfileResult,
					res: IProfileState = {};
				if (data.success) {
					res = { ...data.data as ICustomerProfile };

					res.status = {
						regCodeIsVerified: data.success,
						phoneIsVerified: undefined,
						isLoading: false,

					};
					res.error = false;

					resolve( res );
				} else {

					res.status = {
						regCodeIsVerified: data.success,
						phoneIsVerified: undefined,
						isLoading: false
					};
					res.error = data.error;
					reject(res);
				}
				//res.status = data.state.toString();
				//	res.smsId = res.smsId;


			};

			const error = (err) => reject({
					status: {
						regCodeIsVerified: false,
						phoneIsVerified: false,
						isLoading: false
					},
					error:true
				} as IProfileState);

			AJAX.httpGet({
				url: url,
				successCallback: ok,
				failureCallback: error,
				headers: [
					{ name: "Content-Type", value: "application/x-www-form-urlencoded" },
					{ name: "Authorization", value: "Basic d3M6d3M=" }
				]
			} );
		} );

	}

	static saveProfileAsync( profile: IProfileState): Promise<any> {
		return new Promise<any>((resolve, reject: (reasons: any) => any) => {
			let data = profile;
			const url = `/bslo_retail/hs/loyalty/Profile/save`;
			const ok = (response: XMLHttpRequest) => {
					resolve(response);
			};

			const error = (err) => reject({
				error: true
			} as IProfileState);

			AJAX.httpPost({
				url: url,
				data:data,
				successCallback: ok,
				failureCallback: error,
				headers: [
					{ name: "Content-Type", value: "application/json" },
					{ name: "Authorization", value: "Basic d3M6d3M=" }
				]
			});
		});

	}
	static loadEULAAsync(  ): Promise<any> {
		return new Promise<any>( ( resolve, reject: ( reasons: any ) => any ) => {

			const url = `/bslo_retail/hs/loyalty/eula`;
			const ok = ( response: XMLHttpRequest ) => {
				let data = response.responseText;
				console.log(response);
				resolve( data);
				//res.status = data.state.toString();
				//	res.smsId = res.smsId;


			};

			const error = ( err ) => reject( err);

			AJAX.httpGet( {
				url: url,
				successCallback: ok,
				failureCallback: error,
				headers: [
					{ name: "Content-Type", value: "text/html" },
					{ name: "Authorization", value: "Basic d3M6d3M=" }
				]
			} );
		} );

	}
}
