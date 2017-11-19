import normalizePhone from "./normalizePhone";
import Api from "../../../common/api-http1c";
import { IPhoneInfo } from "../../../core/data/profile-data";
import { IProfileState, IProfileStatus } from "../../../core/store";
import BusyBox from "../../busybox";
import { presets, STextField } from "../../textField";
import { RaisedButton, TextField } from "material-ui";
import * as React from "react";
import { connect } from "react-redux";


export interface IPhoneValidatorProps  {
	getPhoneInfo?: (phone: string) => Promise<IProfileState>;
	updateProfile?: (profile) => any;
	phone?: string;
	phoneInfo?: IPhoneInfo;
	status?: IProfileStatus;
	smsCode?: string;
	isVerified?:boolean;
}


//type PhoneValidatorProps = IPhoneValidatorProps | IProfileState;

export interface IPhoneValidatorState {
	checkingPhoneInfo?: boolean;
	smsCodeSended?: boolean;
	sendedCode?: string;
}

export class PhoneValidator extends React.Component<IPhoneValidatorProps, IPhoneValidatorState> {
	//state: IPhoneValidatorState;
	phoneCheckTimeout = null;
	constructor(props) {
		super(props);

		this.state = {
			checkingPhoneInfo: false,
			smsCodeSended: false,
			sendedCode: ''
		};
	}

	isBusy: boolean = false;

	/*componentWillReceiveProps(nextProps) {
		let phone: string = nextProps.phone || '';
		if (nextProps.status.phoneIsVerified === undefined) {
			phone = phone.replace(/[^\d]/g, '');
			if (phone.length === 11) {
				this.phoneCheckTimeout = window.setTimeout(this.checkPhone, 200);
			}
		}
	}*/

/*	onPhoneChange = (event, value) => {
		if (this.phoneCheckTimeout !== null) window.clearTimeout(this.phoneCheckTimeout);
		this.phoneCheckTimeout = null;
		const phone: string = value.replace(/[^\d]/g, '');
		this.props.updateProfile({ phone: phone });
	};

	checkPhone = () => {
		const phone: string = this.props.phone.replace(/[^\d]/g, '');
		console.log('checkPhone: ' + phone);
		window.clearTimeout(this.phoneCheckTimeout);
		this.phoneCheckTimeout = null;
		this.props.getPhoneInfo(phone);
	};*/

	OnChangeSms = ev => {
		const { name, value } = ev.target;
		let ns: IProfileState = {};
		if (this.state.sendedCode === value) {
			ns.isVerified = true;
		}
		ns.smsCode = value;
		this.props.updateProfile(ns);
	}

	sendSmsCode = () => {
		Api.sendSMSCodeAsync(this.props.phone).then(res => {
			this.props.updateProfile({ sendedSMS: res.code });
		});
	}

	//OnChange = ev => {
	//	const { name, value } = ev.target;
	//	this.props.updateProfile({ [name]: value });
	//}

	render() {

		const props = this.props;

		const smsCode = this.props.isVerified
		? <div></div> :	(!this.state.sendedCode || this.state.sendedCode === '' )
		? 	<RaisedButton
				primary={true}
				onTouchTap={this.sendSmsCode}>
				Отправить SMS
			</RaisedButton>
		: <TextField
				name="smsCode"
				value={this.props.smsCode}
				onChange={this.OnChangeSms}
				floatingLabelText="Код из SMS"
				hintText="Пять цифр кода из SMS" />;

		const phoneView = false
		? <STextField
				name="phone"
				value={normalizePhone(props.phone)}
				onChange={this.onPhoneChange}
				floatingLabelText="Номер телефона"
				hintText="Телефон без 8 и +7." />
		: <div className="bs-column">
				<label style={{ ...presets.style, height: 'auto' }}>
				{normalizePhone(this.props.phone)}
				</label>
				{smsCode}
			</div>;

		return phoneView;
	}

	onPhoneChange = ( e: any, newValue: string ) => {
		if( this.phoneCheckTimeout !== null )
			window.clearTimeout( this.phoneCheckTimeout  );
		this.phoneCheckTimeout = null;
		const phone: string = newValue.replace( /[^\d]/g, '' );
		this.props.updateProfile( { phone: phone } );
	};
}

export default PhoneValidator;
