import * as React from 'react';
import * as areIntlLocalesSupported from 'intl-locales-supported';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Checkbox from "material-ui/Checkbox";
import TextField from "material-ui/TextField";
import RadioButton, { RadioButtonGroup } from "material-ui/RadioButton";
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Api from '../common/Api';
import normalizePhone from './normalizePhone';
import { Paper, Divider, Subheader, List, ListItem, Toggle } from 'material-ui';
import { ActionFavorite, ActionFavoriteBorder } from 'material-ui/svg-icons';
let DateTimeFormat = undefined;
let IntlPolyfill = undefined;
if (areIntlLocalesSupported(['ru', 'ru-RU'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
}
else {
    IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/ru');
    require('intl/locale-data/jsonp/ru-RU');
}
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
const WCheckbox = ({ input, meta, label }) => {
    return (React.createElement("div", null,
        React.createElement(Checkbox, Object.assign({}, input, { label: label })),
        "  "));
};
const BCheckBox = ({ input, meta, label }) => {
    return (React.createElement(Checkbox, Object.assign({}, input, { label: label }, meta)));
};
const BTextInput = ({ input, meta, label, floatingLabelText, hintText, errorText, type, hasBox, ...custom }) => {
    const isEmpty = (input.value === "" || input.value === null);
    const tfClass = (meta.invalid ? " mdc-textfield--invalid" : " mdc-textfield--valid") +
        (meta.active ? " mdc-textfield--focused" : "") +
        (hasBox ? " mdc-textfield--box" : " mdc-textfield--box transparent");
    const labelClasses = !isEmpty || meta.active ? "mdc-textfield__label--float-above" : "";
    const isRequired = "*";
    const showErrorText = !meta.valid && typeof errorText !== 'undefined';
    const showHintText = typeof hintText !== 'undefined';
    const message = showErrorText || showHintText
        ? React.createElement("p", { className: `mdc-textfield-helptext ${showErrorText ? 'mdc-textfield-helptext--validation-msg' : ""}` }, showErrorText ? errorText : hintText)
        : undefined;
    return (React.createElement("div", { id: "tf-" + input.name, className: "bs-field-container" },
        React.createElement("div", { className: "mdc-textfield mdc-textfield--upgraded" + tfClass },
            React.createElement("input", Object.assign({}, input, { type: type !== undefined ? type : "text", id: "tf-box", className: "mdc-textfield__input" })),
            React.createElement("label", { htmlFor: "tf-box", className: "mdc-textfield__label_ " + labelClasses }, label || floatingLabelText),
            React.createElement("div", { className: `mdc-textfield__bottom-line ${meta.active ? 'mdc-textfield__bottom-line--active' : ''}` })),
        message));
};
const renderTextField = ({ input, meta, label, floatingLabelText, hintText, errorText, type, hasBox = false, ...custom }) => {
    if (type === "checkbox") {
        return React.createElement(BCheckBox, Object.assign({ label: label, input: input, meta: meta }, custom));
    }
    return React.createElement(BTextInput, Object.assign({ hintText: hintText, floatingLabelText: floatingLabelText, label: label, errorText: meta.touched && meta.error, input: input, meta: meta, hasBox: hasBox, type: type }, custom));
};
const renderDataPicker = ({ input, meta, floatingLabelText, maxDate, autoOk = true }) => {
    return React.createElement("div", null);
};
class RegForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleNextStepTap = () => {
            this.setState({
                step: this.state.step === 3 ? 0 : this.state.step + 1
            });
        };
        this.handleLoadProfile = () => {
            let p = Api.loadProfileAsync(this.state.regCode).then((data) => {
                data.phone = normalizePhone(data.phone);
                this.props.dispatch(ProfileActionsC.setProfileLoaded(data));
                this.setState({ ...data });
            });
        };
        this.handleChange = (ev) => {
            let state = { ...this.state };
            state[ev.target.name] = ev.target.value;
            this.setState(state);
        };
        this.handleSendSMS = () => {
            let state = {};
            state.smsIsSended = true;
            state.sendedSmsCode = "33756";
            this.setState(state);
        };
        this.handleValidateSMS = () => {
            let state = { ...this.state, phoneIsValid: this.state.smsCode == this.state.sendedSmsCode };
            if (state.phoneIsValid != this.state.phoneIsValid)
                this.setState(state);
        };
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
        const phoneValidation = () => !this.state.smsIsSended
            ? React.createElement("div", null,
                React.createElement(Field, { name: "phone", floatingLabelText: "Номер телефона", hintText: "Cемь цифр телефонного номера без 8 и +7.", errorText: "Необходимо ввести коректный номер телефона.", component: TextField, normalize: normalizePhone, onChange: this.handleChange, required: true, hasBox: true, type: "text" }),
                React.createElement(FlatButton, { label: "Отправить код", primary: true, onTouchTap: this.handleSendSMS }))
            : React.createElement("div", null,
                React.createElement(Field, { name: "smsCode", floatingLabelText: "Проверочный код", hintText: "Введите пять цифр кода из SMS отправленного на указанный номер.", errorText: "Необходимо ввести код из SMS.", component: TextField, onChange: this.handleChange, type: "text", hasBox: true }),
                React.createElement(FlatButton, { label: "Проверить", primary: true, onTouchTap: this.handleValidateSMS }));
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
        return (React.createElement(MuiThemeProvider, { muiTheme: muiTheme },
            React.createElement("div", { style: styles.root },
                React.createElement(Paper, null,
                    React.createElement(List, null,
                        React.createElement(Subheader, null, "General"),
                        React.createElement(ListItem, { primaryText: "Profile photo", secondaryText: "Change your Google+ profile photo" }),
                        React.createElement(ListItem, { primaryText: "Show your status", secondaryText: "Your status is visible to everyone you use with" })),
                    React.createElement(Divider, null),
                    React.createElement(List, null,
                        React.createElement(Subheader, null, "Hangout Notifications"),
                        React.createElement(ListItem, { leftCheckbox: React.createElement(Checkbox, null), primaryText: "Notifications", secondaryText: "Allow notifications" }),
                        React.createElement(ListItem, { leftCheckbox: React.createElement(Checkbox, null), primaryText: "Sounds", secondaryText: "Hangouts message" }),
                        React.createElement(ListItem, { leftCheckbox: React.createElement(Checkbox, null), primaryText: "Video sounds", secondaryText: "Hangouts video call" })),
                    React.createElement(List, null,
                        React.createElement(ListItem, { primaryText: "When calls and notifications arrive", secondaryText: "Always interrupt" })),
                    React.createElement(Divider, null),
                    React.createElement(List, null,
                        React.createElement(Subheader, null, "Priority Interruptions"),
                        React.createElement(ListItem, { primaryText: "Events and reminders", rightToggle: React.createElement(Toggle, null) }),
                        React.createElement(ListItem, { primaryText: "Calls", rightToggle: React.createElement(Toggle, null) }),
                        React.createElement(ListItem, { primaryText: "Messages", rightToggle: React.createElement(Toggle, null) })),
                    React.createElement(Divider, null),
                    React.createElement(List, null,
                        React.createElement(Subheader, null, "Hangout Notifications"),
                        React.createElement(ListItem, { primaryText: "Notifications", leftCheckbox: React.createElement(Checkbox, null) }),
                        React.createElement(ListItem, { primaryText: "Sounds", leftCheckbox: React.createElement(Checkbox, null) }),
                        React.createElement(ListItem, { primaryText: "Video sounds", leftCheckbox: React.createElement(Checkbox, null) }))),
                React.createElement(Paper, { zDepth: 2 },
                    phoneValidation(),
                    React.createElement(Divider, null),
                    React.createElement(Field, { name: "lastName", floatingLabelText: "Фамилия", hintText: "Фамилия", errorText: "", type: "text", component: TextField, onChange: this.handleChange }),
                    React.createElement(Field, { name: "firstName", floatingLabelText: "Имя", hintText: "Имя", errorText: "", component: TextField, type: "text", onChange: this.handleChange }),
                    React.createElement(Field, { name: "midName", floatingLabelText: "Отчество", hintText: "Отчество", errorText: "", type: "text", component: TextField, onChange: this.handleChange }),
                    React.createElement(Divider, null),
                    React.createElement(Field, { name: "email", floatingLabelText: "Электронная почта", hintText: "Электронная почта", errorText: "", type: "text", component: TextField, onChange: this.handleChange }),
                    React.createElement(Divider, null),
                    React.createElement(Field, { name: "hasChildren", label: "Есть дети", type: "checkbox", component: Checkbox, onChange: this.handleChange }),
                    React.createElement(RadioButtonGroup, { name: "shipSpeed", defaultSelected: "" },
                        React.createElement(RadioButton, { value: "light", label: "Simple", style: styles.radioButton }),
                        React.createElement(RadioButton, { value: "not_light", label: "Selected by default", style: styles.radioButton }),
                        React.createElement(RadioButton, { value: "ludicrous", label: "Custom icon", checkedIcon: React.createElement(ActionFavorite, { style: { color: '#F44336' } }), uncheckedIcon: React.createElement(ActionFavoriteBorder, null), style: styles.radioButton })),
                    React.createElement(TextField, { name: "t1", hintText: "First name", underlineShow: false }),
                    React.createElement("img", { src: "./assets/images/bottom-tear.svg", style: { display: 'block', position: 'relative', marginTop: '-10px', maxWidth: '360px' } })),
                "\t ")));
    }
}
;
const validate = (values) => {
    const errors = {};
    return errors;
};
const RegFormRedux = reduxForm({
    form: 'RegForm',
    enableReinitialize: true,
    validate: (values, props) => {
        const errors = {};
        return errors;
    },
    onSubmit: (values, dispatch, props) => {
        console.log('===submit===');
        console.log(values.phone);
    }
})(RegForm);
let mapS2P = (state) => {
    return {
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        phone: state.profile.phone,
        regCode: state.profile.regCode,
        regCodeIsValid: state.profile.regCodeIsValid,
        phoneIsValid: state.profile.phoneIsValid
    };
};
export const RegFormConnected = connect(state => ({
    initialValues: state.profile
}), { load: ProfileActions.loadProfileAsync })(RegFormRedux);
export default RegFormConnected;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/_comp_/RegForm/reg-form.js.map