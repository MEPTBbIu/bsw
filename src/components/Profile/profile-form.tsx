import normalizePhone from "./Phone/normalizePhone";
import { PhoneValidator } from "./phone/phone";
import "./profile.scss";
import Api from "../../common/api-http1c";
import { wGetPhoneInfo } from "../../core/fsa-profile";
import { IProfileState, RootState } from "../../core/store";
import BusyBox from "../busybox";
import STextField, { presets } from "../textField";
import H2R from "html-to-react";
import {
	CardHeader,
	Dialog,
	Divider,
	MenuItem,
	Paper,
	RaisedButton,
	SelectField,
	TextField
	} from "material-ui";
import Checkbox from "material-ui/Checkbox";
import FlatButton from "material-ui/FlatButton";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";




interface IProfileFormActions {
	getPhoneInfo?: (phone: string) => Promise<IProfileState>;
	updateProfile?: (profile) => Promise<IProfileState>;
	onComplete?:  Promise<any>;
	profile?: IProfileState;
}

type ProfileFormProps = IProfileFormActions & DispatchProp<IProfileState>;

interface IProfileFormState {
	loadingEULA?: boolean;
	isEULALoaded?: boolean;
	showGrats?: boolean;
}

export default class ProfileForm extends React.Component<ProfileFormProps, IProfileFormState> {
	//readonly state: IProfileState;
	private _EULA = undefined;
	phoneCheckTimeout = null;

	constructor(props) {
		super(props);
		this.state = {
			loadingEULA: false,
			isEULALoaded: false,
			showGrats: false
		};
	}

	OnGenderChange = (event, index, value) => {
		this.props.updateProfile({ gender: value });
	}

	OnHasChildrenChange = (event, value) => {
		this.props.updateProfile({ hasChildren: value });
	}

	showEULA = () => {
		if (this.props.profile.isVerified)
			if (!this.state.isEULALoaded) {
				this.setState({ loadingEULA: true });
				Api.loadEULAAsync()
					.then(data => {
						this._EULA = H2R.Parser().parse(data);
						this.setState({ loadingEULA: false, isEULALoaded: true });
					})
					.catch(err => {
						this.setState({ loadingEULA: false, isEULALoaded: false });
						console.log(err);
					});
			}
	}

	happyEnd = () => {
		this.setState({ showGrats: false });
		Api.saveProfileAsync(this.props.profile);
		this.props.onComplete();
	}

	OnChange = ev => {
		const { name, value } = ev.target;
		this.props.updateProfile({ [name]: value });
	}

	OnCheckTermsOfPDU = () => {
		this.props.updateProfile({ termsOfPDU: true });
		this.setState({ showGrats: true });
	}

	render() {
		const paperStyle = {
				display: "flex",
				width: "100%",
				flexDirection: "column",
				//alignItems: "center",
				minWidth: "768px",
				padding: "24px auto",
				margin: "auto"
			},
			formItems = presets,
			p = this.props.profile,
			{ status, error } = p,

			showEULA = this.props.profile.isVerified && (this.state.loadingEULA || this.state.isEULALoaded),
			eula = (
				<div className="bs-column">
					{this._EULA}
					<Paper style={paperStyle}>
						<Checkbox
							label="Я согласен с условиями участия"
							style={{ ...presets.style, height: "auto" }}
							checked={p.termsOfPDU}
							onCheck={this.OnCheckTermsOfPDU}/>
					</Paper>
				</div>
			);
		return showEULA
			? (this.state.loadingEULA ? <BusyBox/> : eula)
			: <div className="form-ViewItems--item">
				  <PhoneValidator { ...this.props.profile}/>
				  <Divider style={{ width: "100%" }}/>
				  <STextField name="lastName" value={p.lastName} floatingLabelText="Фамилия" onChange={this.OnChange}/>
				  <Divider style={{ width: "100%" }}/>
				  <STextField name="firstName" value={p.firstName} floatingLabelText="Имя" onChange={this.OnChange}/>
				  <Divider style={{ width: "100%" }}/>
				  <STextField name="midName" value={p.midName} floatingLabelText="Отчество" onChange={this.OnChange}/>
				  <Divider style={{ width: "100%" }}/>
				  <div className="bs-row-2-col">
				  <STextField   name="birthDate"
					   			   type="date"
									value={p.birthDate}
									onChange={this.OnChange}
									floatingLabelText="День рождения"
									style={{ width: "50%" }}/>
					<SelectField
						  value={p.gender}
						  onChange={this.OnGenderChange}
						  floatingLabelFixed={true}
						  floatingLabelText="Пол"
						  underlineStyle={{ display: "none" }}
						  hintText="Мужской/ Женский"
						  style={{ ...presets.style, width: "50%", textAlign: "initial" }}>
						  <MenuItem value={null} label="" primaryText=""/>
						  <MenuItem value={"male"} label="Мужской" primaryText="Мужской"/>
						  <MenuItem value={"female"} label="Женский" primaryText="Женский"/>
					  </SelectField>
				  </div>

				  <Divider style={{ width: "100%" }}/>
				  <div style={{ height: "72px", width: "50%", justifyContent: "center" }} className="bs-column">
					  <Checkbox label="Есть дети" style={{ ...presets.style, height: "auto" }}
								checked={p.hasChildren} onCheck={this.OnHasChildrenChange}/>
				  </div>

				  <STextField name="email" floatingLabelText="Электронная почта" hintText="any@mail.com"
							onChange={this.OnChange} value={p.email}/>
				  <Divider style={{ width: "100%" }}/>
				  {this.props.profile.isVerified
					  ? <RaisedButton primary={true}
						style={{ marginTop: "45px" }}
								backgroundColor={"#1D7BFA"}
								onTouchTap={this.showEULA}>
						Далее  </RaisedButton>
					  : <div />}

				  <Dialog actions={[]} modal={false} open={this.state.showGrats} onRequestClose={this.happyEnd}>
					  <p>{this.props.profile.firstName + " " + this.props.profile.lastName}</p>
					<span>Поздравляем! Вы зарегистрированы в бонусной программе Black Star Wear!</span>
				  </Dialog>
			  </div>;
	}



}

/*const mapStateToProps = ( state: RootState, props: ProfileFormProps ) => {
	return {
		profile: state.profile
	} as ProfileFormProps;
	//...do your thing here
};


const connector = connect(mapStateToProps); */

//export default ProfileForm//connector( );