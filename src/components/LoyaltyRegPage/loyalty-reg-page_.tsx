import "./loyalty-reg-page.scss";
import Loader from "../loader";
import RegCode from "../RegCode";
import StepByStep from "../stepbystep";
import Paper from "material-ui/Paper";
import { MuiThemeProvider } from "material-ui/styles";
import { blueGrey900, grey900 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as React from "react";
import { Divider, TextField, LinearProgress, MenuItem, SelectField } from "material-ui";
import { RootState, IProfileStatus, IProfileState } from "src/core/store";
import { connect} from 'react-redux';
import normalizePhone from "../Profile/phone/normalizePhone";
const muiTheme = getMuiTheme({
	palette: {
		accent1Color: blueGrey900,
		accent2Color: grey900
	},
	textField: {
	}
});

const paperStyle = {
	display: "flex",
	//justifyContent: "center",
	padding: "28px",
	flexDirection: "column",
	//height: "100%",
	alignItems: "center"
};

interface ILoyaltyRegProps   {
	profile?: IProfileState	;
	//status?: IProfileStatus;
	//regCode?: string;
	//error?: string | boolean | Object;

}

interface ILoyaltyRegState {
}

class LoyaltyRegPage extends React.Component<ILoyaltyRegProps> {
	

	constructor (props: ILoyaltyRegProps) {
		super(props);
		
	}
	onPhoneChange = ( event, value ) => {
		const phone = value.replace( /[^\d]/g, "" );
		this.setState( { phone: phone } );
	}


	OnGenderChange = ( event, index, value ) => {

		this.setState( { gender: value } );
	}

	OnHasChildrenChange = ( event, i, value ) => {

		this.setState( { hasChildren: value } );

	}

	OnChange = ( ev ) => {
		const name = ev.target.name,
			value = ev.target.value;
		let st: IProfileState = {};
		st[name] = value;;

		this.setState( st );
	}

	render() {
		const showLoader = false,
			p = this.props.profile,
			style = {	marginLeft: 20 },
			{ status, regCode, error } = this.props.profile;

		const DividerExampleForm = () => (
			<Paper zDepth={1}> 

				<TextField name="phone" value={normalizePhone( p.phone )} onChange={this.onPhoneChange}
					floatingLabelText="Номер телефона" hintText="Телефон без 8 и +7." />
				{
					( !status.phoneIsVerified ) &&
					<LinearProgress style={/*Styles.TextFieldProgress.root*/} mode="indeterminate" />
				}
				
		
				<TextField name="lastName" value={p.lastName}
					floatingLabelText="Фамилия" onChange={this.OnChange} />
				<TextField name="firstName" value={p.firstName}
					floatingLabelText="Имя" onChange={this.OnChange} />
				<TextField name="midName" value={p.midName}
					floatingLabelText="Отчество" onChange={this.OnChange} />
		<SelectField value={p.gender} onChange={this.OnGenderChange}
					floatingLabelFixed={true} floatingLabelText="Пол" hintText="Мужской/ Женский">
					<MenuItem value={null} label="" primaryText="" />
					<MenuItem value={"male"} label="Мужской" primaryText="Мужской" />
					<MenuItem value={"female"} label="Женский" primaryText="Женский" />
				</SelectField>

				<TextField name="birthday" type="date" value={p.birthday}
					onChange={this.OnChange} floatingLabelText="День рождения" hintText="" />

				<SelectField value={p.hasChildren}
					floatingLabelText="Есть дети?" hintText="Да/Нет"
					onChange={this.OnHasChildrenChange} floatingLabelFixed={true}>

					<MenuItem value={""} label="" primaryText="" />
					<MenuItem value={true} label="Да" primaryText="Да" />
					<MenuItem value={false} label="Нет" primaryText="Нет" />
				</SelectField>
		
		
		
				<TextField name="email" floatingLabelText="Электронная почта" hintText="any@mail.com"
					onChange={this.OnChange} value={p.email} />
			

				<Divider/>
			</Paper > );

		return (
			<MuiThemeProvider muiTheme={muiTheme}>

				<Paper zDepth={0} style={{
					display: "flex",
					//justifyContent: "center",
					padding: "28px",
					flexDirection: "column",
					//height: "100%",
					alignItems: "center"
				}}>
					<div className="floatColumn">
						{!status.regCodeIsVerified?
							<RegCode status={status} regCode={regCode} error={error}  /> :
							<DividerExampleForm />}

					</div>

				</Paper>

			</MuiThemeProvider>
		);
	}
}


const mapStateToProps = ( state: RootState, props: ILoyaltyRegProps ) => {
	return {
		profile: state.profile
	} as ILoyaltyRegProps;
};

const connector = connect( mapStateToProps );

export default connector( LoyaltyRegPage );

