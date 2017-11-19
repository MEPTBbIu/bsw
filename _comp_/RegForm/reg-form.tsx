//import './mdc-radio.scss';
//import './reg-form.scss';
//import './checkbox.scss';
//import './Stepper.css';

import * as React from 'react';
import * as Redux from 'redux';
import * as areIntlLocalesSupported from 'intl-locales-supported';

import {
	Field,
	Form,
	FormErrors,
	FormSection,
	InjectedFormProps,
	SubmitHandler,
	WrappedFieldProps,
	reduxForm
	} from 'redux-form';
import { ICustomerProfile, ICustomerProfileState, IPhoneRegion } from '../core/ProfileData';
import { RootState } from '../core/reducers/initialState';
import {  connect } from 'react-redux';
/*import {
	Step,
	StepContent,
	StepLabel,
	Stepper
	} from 'material-ui/Stepper';	*/

import  Checkbox  from "material-ui/Checkbox";
import  TextField from "material-ui/TextField";
import RadioButton, { RadioButtonGroup } from "material-ui/RadioButton";
/*import  FloatingActionButton from 'material-ui/FloatingActionButton';
import  DatePicker  from 'material-ui/DatePicker'; */
import  FlatButton from 'material-ui/FlatButton';
import  MuiThemeProvider  from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import { ActionSearch } from 'material-ui/svg-icons';


import Api from '../common/Api';
//import { ProfileActions, ProfileActionsC } from '../core/actions/profile';
import { RootActionT as RootAction } from '../core/actions';
import normalizePhone from './normalizePhone';
import { Paper, Divider, Subheader, List, ListItem, Toggle } from 'material-ui';
import { ActionFavorite, ActionFavoriteBorder } from 'material-ui/svg-icons';

let DateTimeFormat = undefined;
let IntlPolyfill = undefined;

if (areIntlLocalesSupported(['ru', 'ru-RU'])) {
	DateTimeFormat = global.Intl.DateTimeFormat;
} else {
	IntlPolyfill = require('intl');
	DateTimeFormat = IntlPolyfill.DateTimeFormat;
	require('intl/locale-data/jsonp/ru');
	require('intl/locale-data/jsonp/ru-RU');
}


//import "./../assets/scss/textfield/mdc-textfield.scss"


const styles = {
	container: {
		textAlign: 'center',
		height: "100%",
	}
};

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500,
	},
});


interface IRegFormState extends ICustomerProfileState {
	step?: number;
	smsIsSended?: boolean;
	sendedSmsCode?: string;
	smsCode?: string;
	showDebug?: boolean;
}

interface IRegFormProps {
	dispatch?: Redux.Dispatch<RootState>;

//	onChange?:()=>void
	onSubmit?: SubmitHandler;
	loadProfile?: (regCode: string, dispatch: Redux.Dispatch<RootState>) => React.Promise<ICustomerProfile>;
}

type RegFormProps = IRegFormProps & InjectedFormProps<IRegFormState, IRegFormProps>;


interface ITextInputProps extends WrappedFieldProps {
	hintText?: string;
	errorText?: string;
	floatingLabelText?: string;
	label?: string;
	type?: string;
	hasBox?: boolean;

}

const WCheckbox = ({ input, meta, label }) => {
	return (<div>
						  
			          <Checkbox {...input} label={label} />  </div> )	}
	
const BCheckBox = ({ input, meta, label }) => {
	return (<Checkbox {...input} label={label} {...meta}/>);

}

const BTextInput =
	({ input, meta, label, floatingLabelText, hintText, errorText, type, hasBox, ...custom }: ITextInputProps) => {

		const isEmpty = (input.value === "" || input.value === null);
		const tfClass = (meta.invalid ? " mdc-textfield--invalid" : " mdc-textfield--valid") +
			(meta.active ? " mdc-textfield--focused" : "") +
			(hasBox ? " mdc-textfield--box" : " mdc-textfield--box transparent");
		const labelClasses = !isEmpty || meta.active ? "mdc-textfield__label--float-above" : "";
		const isRequired = "*";
		const showErrorText = !meta.valid && typeof errorText !== 'undefined';
		const showHintText = typeof hintText !== 'undefined';
		const message = showErrorText || showHintText
			? <p className={`mdc-textfield-helptext ${showErrorText ? 'mdc-textfield-helptext--validation-msg' : ""}`}>{
				showErrorText ? errorText : hintText}</p>
			: undefined;
		//required={false} pattern=".{8,}"

		return (
			<div id={"tf-" + input.name} className="bs-field-container">
				<div className={"mdc-textfield mdc-textfield--upgraded" + tfClass}>
					<input {...input} type={type !== undefined ? type : "text"} id="tf-box" className={"mdc-textfield__input"}/>
					<label htmlFor="tf-box" className={"mdc-textfield__label_ " + labelClasses}>{label || floatingLabelText}</label>
					<div className={`mdc-textfield__bottom-line ${meta.active ? 'mdc-textfield__bottom-line--active' : ''}`}/>
				</div>
				{message}
			</div>
		);
	}

const renderTextField =
	({ input, meta, label, floatingLabelText, hintText, errorText, type, hasBox = false, ...custom }) => {
		if (type === "checkbox") {
			return <BCheckBox
						label={label}
						input={input}
						meta={meta}
						{...custom}/>;

		}
		return <BTextInput
					hintText={hintText}
					floatingLabelText={floatingLabelText}
					label={label}
					errorText={meta.touched && meta.error}
					input={input}
					meta={meta}
					hasBox={hasBox}
					type={type}
					{...custom}/>;
	};
const renderDataPicker =
	({ input, meta, floatingLabelText, maxDate, autoOk = true }) => {
		return <div></div>;
		/*	{...input} {...meta}
			floatingLabelText={floatingLabelText}
			autoOk={autoOk}
			minDate={this.state.minDate}
			maxDate={maxDate}
			disableYearSelection={this.state.disableYearSelection}
/>;	  */
	}
class RegForm extends React.Component<RegFormProps, IRegFormState> {


	handleNextStepTap = () => {
		this.setState({
			step: this.state.step === 3 ? 0 : this.state.step + 1
		});
	}
	handleLoadProfile = () => {
		let p = Api.loadProfileAsync(this.state.regCode).then(
			(data) => {
				data.phone = normalizePhone(data.phone);
				this.props.dispatch(ProfileActionsC.setProfileLoaded(data));
				this.setState({ ...data });

			});
		//this.props.loadProfile(this.state.regCode, this.props.dispatch);

	}
	handleChange = (ev) => {
		let state = { ...this.state };
		state[ev.target.name] = ev.target.value;
		this.setState(state);
	}
	handleSendSMS = () => {
		//	let p = Api.sendSMSCodeAsync("7"+this.state.phone).then((data)=>{
		let state = {} as IRegFormState;
		state.smsIsSended = true;
		state.sendedSmsCode = "33756"; //data.code;
		this.setState(state);
		//})
	}
	handleValidateSMS = () => {
		let state: IRegFormState = { ...this.state, phoneIsValid: this.state.smsCode == this.state.sendedSmsCode };

		if (state.phoneIsValid != this.state.phoneIsValid)
			this.setState(state);
	}

	constructor(props) {
		super(props);
		let step = props.initialValues.regCodeIsValid ? 1 : 0;
		step = props.initialValues.phoneIsValid ? 2 : step;
		this.state = {
			...props.initialValues,
			step: step,
			showDebug: false,
			phoneIsValid: false,
			smsIsSended: false
		};
	}

	render() {
		let step = this.state.regCodeIsValid ? 1 : 0;
		step += this.state.phoneIsValid ? 1 : 0;

	const phoneValidation = () =>
			!this.state.smsIsSended
			? <div>
				  <Field name="phone"
						floatingLabelText="Номер телефона"
						hintText="Cемь цифр телефонного номера без 8 и +7."
						errorText="Необходимо ввести коректный номер телефона."
						component={TextField} normalize={normalizePhone} onChange={this.handleChange}
						required={true} hasBox={true} type="text"/>
				  <FlatButton label="Отправить код" primary={true} onTouchTap={this.handleSendSMS}/>
			  </div>
			: <div>
				  <Field name="smsCode"
						floatingLabelText="Проверочный код"
						hintText="Введите пять цифр кода из SMS отправленного на указанный номер."
						errorText="Необходимо ввести код из SMS."
						component={TextField} onChange={this.handleChange} type="text" hasBox={true}/>
				  <FlatButton label="Проверить" primary={true} onTouchTap={this.handleValidateSMS}/>
			  </div>; /*	*/

	//	const maxDate = new Date(Date.now());
	//	const maxDateString = maxDate.toLocaleDateString('ru-RU');
		// Форматирование ниже предполагает, что местный часовой пояс равен
		// America/Los_Angeles для локали США

		// В америкаском английском используется порядок месяц-день-год
		//	console.log(date.toLocaleDateString('ru-RU'));

		/*	this.state = {
				minDate: minDate,
				maxDate: maxDate,
				autoOk: false,
				disableYearSelection: false,
			};}	*/
	const styles = {
		block: {
			maxWidth: 250,
		},
		radioButton: {
			marginBottom: 16,
		},
			root: {
				display: 'flex',
				flexWrap: 'wrap',
			},
		};
		let n1done = false;
		return (<MuiThemeProvider muiTheme={muiTheme}>
			        <div style={styles.root}>
		       		<Paper>
			        <List>
				        <Subheader>General</Subheader>
				        <ListItem
					        primaryText="Profile photo"
					        secondaryText="Change your Google+ profile photo"
				        />
				        <ListItem
					        primaryText="Show your status"
					        secondaryText="Your status is visible to everyone you use with"
				        />
			        </List>
			        <Divider />
			        <List>
				        <Subheader>Hangout Notifications</Subheader>
				        <ListItem
					        leftCheckbox={<Checkbox />}
					        primaryText="Notifications"
					        secondaryText="Allow notifications"
				        />
				        <ListItem
					        leftCheckbox={<Checkbox />}
					        primaryText="Sounds"
					        secondaryText="Hangouts message"
				        />
				        <ListItem
					        leftCheckbox={<Checkbox />}
					        primaryText="Video sounds"
					        secondaryText="Hangouts video call"
				        />
			        </List>
		      
			        <List>
				        <ListItem
					        primaryText="When calls and notifications arrive"
					        secondaryText="Always interrupt"
				        />
			        </List>
			        <Divider />
			        <List>
				        <Subheader>Priority Interruptions</Subheader>
				        <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
				        <ListItem primaryText="Calls" rightToggle={<Toggle />} />
				        <ListItem primaryText="Messages" rightToggle={<Toggle />} />
			        </List>
			        <Divider />
			        <List>
				        <Subheader>Hangout Notifications</Subheader>
				        <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
				        <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
				        <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
			        </List>
		        
						</Paper >
			<Paper zDepth={2}>
				{phoneValidation()}
				<Divider />
				<Field name="lastName"
					floatingLabelText="Фамилия"
					hintText="Фамилия"
					errorText=""
					type="text"
					component={TextField}
					onChange={this.handleChange} />
				<Field name="firstName"
					floatingLabelText="Имя"
					hintText="Имя"
					errorText=""
					component={TextField}
					type="text"
					onChange={this.handleChange} />
				<Field name="midName"
					floatingLabelText="Отчество"
					hintText="Отчество"
					errorText=""
					type="text"
					component={TextField}
					onChange={this.handleChange} />
				<Divider />
				<Field name="email"
					floatingLabelText="Электронная почта"
					hintText="Электронная почта"
					errorText=""
					type="text"
					component={TextField}
					onChange={this.handleChange} />
				<Divider />
				<Field name="hasChildren"
					label="Есть дети"
					type="checkbox"
					component={Checkbox}
					onChange={this.handleChange} />
				<RadioButtonGroup name="shipSpeed" defaultSelected="">
					<RadioButton
						value="light"
						label="Simple"
						style={styles.radioButton}
					/>
					<RadioButton
						value="not_light"
						label="Selected by default"
						style={styles.radioButton}
					/>
					<RadioButton
						value="ludicrous"
						label="Custom icon"
						checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
						uncheckedIcon={<ActionFavoriteBorder />}
						style={styles.radioButton}
					/>
				</RadioButtonGroup>
				<TextField name="t1" hintText="First name" /*style={style} */ underlineShow={false} />
				<img src="./assets/images/bottom-tear.svg" style={{ display: 'block', position: 'relative', marginTop: '-10px', maxWidth: '360px' }} />
			
			</Paper>	 </div>
		        </MuiThemeProvider>
		);
	}
};

/**
 *
 * 	        <DatePicker name="birthday"
									floatingLabelText="День рождения"
									autoOk={true}
									formatDate={new DateTimeFormat('ru-RU',
										{
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										}).format}
									okLabel="OK"
									cancelLabel="Отмена"
									locale="ru" style={{ width: "auto" }}/>
				        <Field name="regCode" component={renderTextField}
								hintText="Код регистрации напечатан в нижней части кассового чека. Уточните у кассира."
								floatingLabelText="Код регистрации"
								errorText="Код ненайден."
								onChange={this.handleChange} type="text" hasBox={true}/>
				        <FlatButton label="Далее" primary={true} onTouchTap={this.handleLoadProfile}/>
				        {phoneValidation()}

					        <div className="row">
						        <div className="col-2">
							        <Field name="lastName"
											label="Фамилия"
											hintText=""
											errorText=""
											type="text"
											component={renderTextField}
											onChange={this.handleChange}/>
							        <Field name="firstName"
											label="Имя"
											hintText=""
											errorText=""
											component={renderTextField}
											type="text"
											onChange={this.handleChange}/>
							        <Field name="midName"
											label="Отчество"
											hintText=""
											errorText=""
											type="text"
											component={renderTextField}
											onChange={this.handleChange}/>
						        </div>
					        </div>
					        <div className="row">
						        <div className="col-3"></div>
						        <div className="col-3">
							        <Field name="email"
											label="Электронная почта"
											hintText=""
											errorText=""
											type="text"
											component={renderTextField}
											onChange={this.handleChange}/>
						        </div>
						        <div className="col-3"></div>
					        </div>


						<FlatButton label="Далее"
									primary={true}
									onTouchTap={this.handleNextStepTap}/>
 * /
 * @param values
 */
//component={renderDataPicker}
//onChange={this.handleChange}
//maxDate={maxDate}

const validate = (values: Readonly<IRegFormState>): FormErrors<IRegFormState> => {
	const errors: FormErrors<IRegFormState> = {};

	return errors;
};
const RegFormRedux = reduxForm<IRegFormState, RegFormProps>({

	form: 'RegForm',
	enableReinitialize: true,
	validate: (values: Readonly<IRegFormState>, props: RegFormProps) => {
		const errors: FormErrors<IRegFormState> = {};
		return errors;
	},
	onSubmit: (values, dispatch, props) => {
		// tslint:disable-next-line:no-console
		console.log('===submit===');
		// tslint:disable-next-line:no-console
		console.log(values.phone);
	}
})(RegForm);


// MapStateToProps<RootState, RegFormState> =
let mapS2P = (state: RootState): IRegFormState => {
	return {
		firstName: state.profile.firstName,
		lastName: state.profile.lastName,
		phone: state.profile.phone,
		regCode: state.profile.regCode,
		regCodeIsValid: state.profile.regCodeIsValid,
		phoneIsValid: state.profile.phoneIsValid

	};

};


export const RegFormConnected = connect(
	state => ({
		initialValues: state.profile // pull initial values from account reducer
	}),
	{ load: ProfileActions.loadProfileAsync } // bind account loading action creator
)(RegFormRedux);


//export const RegFormContainer = connect<RootState, IRegFormProps>(mapS2P)(RegForm);

export default RegFormConnected;