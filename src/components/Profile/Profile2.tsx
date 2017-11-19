import "./profile.scss";
import React from "react";
import { AppStore, IProfileState as ICustomerProfileState} from "../../core/store";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import normalizePhone from "./phone/normalizePhone";
import { DispatchProp } from "react-redux";
import { MuiThemeProvider } from "material-ui/styles";
import { ChangeEvent } from "react";
import { deepOrange500, cyan500 } from "material-ui/styles/colors";
												 
import { Paper, LinearProgress, MenuItem, TextFieldProps } from "material-ui";
import { EventOrValueHandler } from "redux-form";
const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500,
	},
	textField: {
	}
});


const Styles = {
	TextFieldProgress: {
		root: {
			bottom: "8px",
			position: "relative",
			height: "3px",
			display: "flex",
			width: "100%",
			backgroundColor: "transparent",
			borderRadius: "0px",
			margin: "0px",
			overflow: "hidden"
		}
	},
	Paper: {
		root: {
			display: "flex",
			//justifyContent: "center",
			paddingTop: "28px",
			flexDirection: "column",
			height: "100%",
			alignItems: "center"
		}
	},
	BsFloatRow: {
		root: {
			display: "inline-flex",
			flexDirection: "row",
			flexFlow: "row wrap",
			margin: "26px",
			flex: "0 1 auto",
			justifyContent: "space-evenly"
		}
	},
	BsFloatColumn: {
		root: {
			display: "flex",
			flexDirection: "column",
			margin: "0 14px",
			flex: "1 1 auto",
			//alignItems: 
		}
	}
};
const commonStyles = {
	root: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "column",
		border: "none",
		minWidth: "60%",
		flexFlow: "column wrap",
		alignItems: "stretch",
		flex: "0 0 auto"

	},
	divider2: {
		width: "60%",
		margin: "28px auto 0"
	},
	column: { display: "flex", flexDirection: "column", alignItems: "center" },
	row: { display: "flex", flexDirection: "row", alignItems: "center" }
};

const BsFloatColumn = ({ children }) => {

	//let root = { ...Styles.BsFloatColumn.root };
	return <div name="COLUMN" style={Styles.BsFloatColumn.root}>{children}</div>;
};

const BsFloatRow = ({ children }) => {
	let root = { ...Styles.BsFloatRow.root };
	return <div name="ROW" style={Styles.BsFloatRow.root}>{children}</div>;
};


function logProps<P>(WrappedComponent) {
	return class extends React.Component<P> {
		name: string = `LP(${WrappedComponent.name})`;
		//componentWillReceiveProps(nextProps) {
		//	console.log('Current props: ', this.props);
		//	console.log('Next props: ', nextProps);
		//}

		render() {

			// Wraps the input component in a container, without mutating it. Good!
			return <WrappedComponent {...this.props}/>;
		}
	};
}


const LTextField = logProps<TextFieldProps>(TextField);
const TF = ({
				name,
				defaultValue,
				hintText,
				floatingLabelText,
				onChange,
				value = undefined,
				required = true,
				fullWidth = true,
				floatingLabelFixed = true,
				type = "text"
			}) => {

	return (
		<LTextField
			value={value}
			name={ name }
			hintText={ hintText }
			defaultValue={ defaultValue }
			floatingLabelText={ floatingLabelText }
			//style={this.fx_txtfld}
 floatingLabelFixed={ floatingLabelFixed }
			onChange={ onChange }
			required={ required }
			fullWidth={ fullWidth }
			type={ type }/>
	);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
//	smsIsSended?: boolean;/**/
//	sendedSmsCode?: string;
//	setAppIdle?:any;
//	setAppView?: any;
//	profile?: ICustomerProfileState;

interface IProfileProps {
	initialValues?: ICustomerProfileState;
	updateProfileData?: (data: ICustomerProfileState) => void;
}

export class Profile extends React.Component<IProfileProps, ICustomerProfileState> {

	phoneIsValid: boolean;

	private _phoneText: string;

	constructor(props: IProfileProps) {
		super(props);
		//const { initialValues } = props;
		this.state = { ...props.initialValues };
	}


	//get phone(): string {
	//	return this._phoneText;
	//}

	//set phone(value: string) {
	//	this._phoneText = normalizePhone(value);
	//	this.setState({ phone: this._phoneText.replace(/[^\d]/g, "") });
	//}

	onPhoneChange = (event, value) => {
		const phone = value.replace(/[^\d]/g, "");
		this.setState({ phone: phone });
	}


	OnGenderChange = (event, index, value) => {

		this.setState({ gender: value });
	}

	OnHasChildrenChange = (event, i, value) => {

		this.setState({ hasChildren: value });

	}

	OnChange = (ev) => {
		const name = ev.target.name,
			value = ev.target.value;
		let st: ICustomerProfileState = {};
		st[name] = value; ;

		this.setState(st);
	}

	fx_txtfld = {
		width: 296,
		margin: "0 24px"
	};
	fx_root = {
		display: "inline-flex",
		margin: "0px 12px",
		flex: "0 1 auto",
		flexDirection: "column",
		alignItems: "center"
	};
	fx_row = {
		padding: "17px 28px 16px 28px",
		display: "flex",
		flexFlow: "column wrap",
		background: "#9e9e9e1f",
		margin: "0 14px 28px 14px"
	};


	render() {
		const valueLink = {
			value: this.state.firstName,
			requestChange: this.OnChange
		};

		const { state, OnChange, OnHasChildrenChange, OnGenderChange, onPhoneChange } = this,
			{ firstName, lastName, midName, gender, birthday, hasChildren, email, phone } = state;


		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<section id="p-c2-1" className="p-container">
					<div id="p-c2-2" className="p-c2"/>
					<div className="p-c1">
						<TF name="phone" value={normalizePhone(phone)} onChange={onPhoneChange}
							floatingLabelText="Номер телефона" hintText="Телефон без 8 и +7."/>
						{
							(!state.phoneIsValid && state.regCodeIsValid) &&
								<LinearProgress style={Styles.TextFieldProgress.root} mode="indeterminate"/>
						}
					</div>
					<div className="p-c2"/>
					<div className="p-c1">
						<TF name="lastName" value={lastName}
							floatingLabelText="Фамилия" onChange={OnChange}/>
						<TF name="firstName" value={firstName}
							floatingLabelText="Имя" onChange={OnChange}/>
						<TF name="midName" value={midName}
							floatingLabelText="Отчество" onChange={OnChange}/>
					</div>
					<div className="p-c2"/>
					<div className="p-c1">

						<SelectField value={gender} onChange={OnGenderChange}
									floatingLabelFixed={true} floatingLabelText="Пол" hintText="Мужской/ Женский">
							<MenuItem value={null} label="" primaryText=""/>
							<MenuItem value={"male"} label="Мужской" primaryText="Мужской"/>
							<MenuItem value={"female"} label="Женский" primaryText="Женский"/>
						</SelectField>

						<TF name="birthday" type="date" value={birthday}
							onChange={OnChange} floatingLabelText="День рождения" hintText=""/>

						<SelectField value={hasChildren}
									floatingLabelText="Есть дети?" hintText="Да/Нет"
									onChange={OnHasChildrenChange} floatingLabelFixed={true}>

							<MenuItem value={""} label="" primaryText=""/>
							<MenuItem value={true} label="Да" primaryText="Да"/>
							<MenuItem value={false} label="Нет" primaryText="Нет"/>
						</SelectField>
					</div>
					<div className="p-c2"/>
					<div className="p-c1">
						<TF name="email" floatingLabelText="Электронная почта" hintText="any@mail.com"
							onChange={OnChange} value={email}/>
					</div>
				</section>
			</MuiThemeProvider>
		);
	}
}

export default Profile;
/**			<div style={fx_root}>
{PHONE_INPUT} </div> */