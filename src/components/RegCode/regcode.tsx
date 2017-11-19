import "./regcode.css";
import { acUpdateProfile, wLoadProfile } from "../../core/fsa-profile";
import { IProfileState, IProfileStatus, RootState } from "../../core/store";
import BusyBox from "../busybox";
import { FormViewItem, FormViewItemInput } from "../form-layout";
import Numpad from "../numpad/Numpad";
import { presets, STextField } from "../textField";
import {
	Divider,
	LinearProgress,
	MenuItem,
	Paper,
	TextFieldProps
	} from "material-ui";
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardText,
	CardTitle
	} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SelectField from "material-ui/SelectField";
import Subheader from "material-ui/Subheader";
import IconSearch from "material-ui/svg-icons/action/search";
import TextField from "material-ui/TextField";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

//import QrReader from './qr-code';

interface IRegCodeProps {
	checkRegCode?: (regCode: string) => Promise<IProfileState>;
	updateProfile?: (profile: IProfileState) => Dispatch<IProfileState>;
	status?: IProfileStatus;
	regCode?: string;
	error?: string | boolean | Object;
}

const Styles = {
	Paper: {
		display: 'flex',
		padding: '28px',
		flexDirection: 'column',
		alignItems: 'center',
		width: '62vw'
	},
	FloatRowStyle: {
		display: 'inline-flex',
		flexDirection: 'row',
		flexFlow: 'row wrap',
		margin: '26px',
		flex: '0 1 auto',
		justifyContent: 'space-evenly'
	},
	FloatColumnStyle: {
		display: 'flex',
		flexDirection: 'column',
		margin: '0 14px',
		flex: '1 1 auto'
		//alignItems:
	}
};
//name="COLUMN" style={Styles.FloatColumnStyle}>
type RegCodeState = { regCode?: string };
const FloatColumn = ({ children }) => <div>{children}</div>;
const FloatRow = ({ children }) => <div>{children}</div>;


export default class RegCode extends React.Component<IRegCodeProps, RegCodeState> {
	constructor(props) {
		super(props);
	}

	startRegCodeVerify(ev) {
		if (!this.props.status.isLoading) this.props.checkRegCode(this.props.regCode);
	}

	handleScan = (result: string) => {};

	handleError = err => {
		console.error(err);
	}

	onChange(ev) {
		const { name, value } = ev.target;
		this.props.updateProfile({ regCode: value });

	}
	render() {
	/*	const FormItems = {
				style: {
					fontSize: '22px',
					lineHeight: '34px',
					width: '225px',
					height: '98px'
				},

				floatingLabelFocusStyle: { color: '#3A67D1' },
				floatingLabelStyle: { color: '#48A3CE' },
				textareaStyle: {
					width: '45vh',
					height: '95px'
				},
				floatingLabelShrinkStyle: { color: '#363636' },
				inputStyle: {
					/*textAlign: "center" width: "100%",*/
	/*				fontSize: '22px',
					fontWeight: 400,
					lineHeight: '35px'
	}
				//hintStyle: {}
			},
			previewStyle = { height: 240, width: 320 };*/
		return (
			<div className="freebirdFormviewerViewFormContent">
				<div className="freebirdFormviewerViewHeaderHeader">
					<CardMedia style={{ textAlign: 'center' }}>
						<img src="./assets/images/logo.png" alt=""
							style={{
								height: '20vh',
								minWidth: '0',
								width: 'auto',
								margin: '0 auto'
							}}/>
					</CardMedia>
					<div className="freebirdFormviewerViewHeaderTitleRow">
						<div className="freebirdFormviewerViewHeaderTitle ext-centredTitle" dir="auto" role="heading">
							BLACK STAR BONUS!
						</div>
						<div className="freebirdFormviewerViewHeaderTitle ext-centredTitle ext-subTitle" style={{ width: "60%" }}>
							Добро пожаловать в Бонусную Программу Black Star Bonus!
							Получайте баллы за покупки и оплачивайте ими до 20% стоимости будущих покупок!
						</div>
					</div>
				</div>
				<div className="freebirdFormviewerViewItemList" role="list">
					<FormViewItem title="test">
							<FormViewItemInput/>
					</FormViewItem>
					<FormViewItem title="test">
						<BusyBox/>
					</FormViewItem>
				</div>
			</div>);
	}
}
		// STextField name="regCode"
		//	 onChange=ev => this.onChange(ev)
		//	 value=this.props.regCode
		//	 hintText="Код регистрации"
		//	 errorText=this.props.error
		//	 autoFocus=true
		//	 searchActive  FlatButton
		//  primary=true onTouchTap=ev => this.startRegCodeVerify(ev
		//	Для начала регистрации введите код, напечатанный на чеке.
