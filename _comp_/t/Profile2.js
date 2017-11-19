import "./profile.scss";
import React from "react";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import normalizePhone from "./phone/normalizePhone";
import { MuiThemeProvider } from "material-ui/styles";
import { LinearProgress, MenuItem } from "material-ui";
const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
    textField: {}
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
    return React.createElement("div", { name: "COLUMN", style: Styles.BsFloatColumn.root }, children);
};
const BsFloatRow = ({ children }) => {
    let root = { ...Styles.BsFloatRow.root };
    return React.createElement("div", { name: "ROW", style: Styles.BsFloatRow.root }, children);
};
function logProps(WrappedComponent) {
    return class extends React.Component {
        constructor() {
            super(...arguments);
            this.name = `LP(${WrappedComponent.name})`;
        }
        render() {
            return React.createElement(WrappedComponent, Object.assign({}, this.props));
        }
    };
}
const LTextField = logProps(TextField);
const TF = ({ name, defaultValue, hintText, floatingLabelText, onChange, value = undefined, required = true, fullWidth = true, floatingLabelFixed = true, type = "text" }) => {
    return (React.createElement(LTextField, { value: value, name: name, hintText: hintText, defaultValue: defaultValue, floatingLabelText: floatingLabelText, floatingLabelFixed: floatingLabelFixed, onChange: onChange, required: required, fullWidth: fullWidth, type: type }));
};
export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.onPhoneChange = (event, value) => {
            const phone = value.replace(/[^\d]/g, "");
            this.setState({ phone: phone });
        };
        this.OnGenderChange = (event, index, value) => {
            this.setState({ gender: value });
        };
        this.OnHasChildrenChange = (event, i, value) => {
            this.setState({ hasChildren: value });
        };
        this.OnChange = (ev) => {
            const name = ev.target.name, value = ev.target.value;
            let st = {};
            st[name] = value;
            ;
            this.setState(st);
        };
        this.fx_txtfld = {
            width: 296,
            margin: "0 24px"
        };
        this.fx_root = {
            display: "inline-flex",
            margin: "0px 12px",
            flex: "0 1 auto",
            flexDirection: "column",
            alignItems: "center"
        };
        this.fx_row = {
            padding: "17px 28px 16px 28px",
            display: "flex",
            flexFlow: "column wrap",
            background: "#9e9e9e1f",
            margin: "0 14px 28px 14px"
        };
        this.state = { ...props.initialValues };
    }
    render() {
        const valueLink = {
            value: this.state.firstName,
            requestChange: this.OnChange
        };
        const { state, OnChange, OnHasChildrenChange, OnGenderChange, onPhoneChange } = this, { firstName, lastName, midName, gender, birthday, hasChildren, email, phone } = state;
        return (React.createElement(MuiThemeProvider, { muiTheme: muiTheme },
            React.createElement("section", { id: "p-c2-1", className: "p-container" },
                React.createElement("div", { id: "p-c2-2", className: "p-c2" }),
                React.createElement("div", { className: "p-c1" },
                    React.createElement(TF, { name: "phone", value: normalizePhone(phone), onChange: onPhoneChange, floatingLabelText: "Номер телефона", hintText: "Телефон без 8 и +7." }),
                    (!state.phoneIsValid && state.regCodeIsValid) &&
                        React.createElement(LinearProgress, { style: Styles.TextFieldProgress.root, mode: "indeterminate" })),
                React.createElement("div", { className: "p-c2" }),
                React.createElement("div", { className: "p-c1" },
                    React.createElement(TF, { name: "lastName", value: lastName, floatingLabelText: "Фамилия", onChange: OnChange }),
                    React.createElement(TF, { name: "firstName", value: firstName, floatingLabelText: "Имя", onChange: OnChange }),
                    React.createElement(TF, { name: "midName", value: midName, floatingLabelText: "Отчество", onChange: OnChange })),
                React.createElement("div", { className: "p-c2" }),
                React.createElement("div", { className: "p-c1" },
                    React.createElement(SelectField, { value: gender, onChange: OnGenderChange, floatingLabelFixed: true, floatingLabelText: "Пол", hintText: "Мужской/ Женский" },
                        React.createElement(MenuItem, { value: null, label: "", primaryText: "" }),
                        React.createElement(MenuItem, { value: "male", label: "Мужской", primaryText: "Мужской" }),
                        React.createElement(MenuItem, { value: "female", label: "Женский", primaryText: "Женский" })),
                    React.createElement(TF, { name: "birthday", type: "date", value: birthday, onChange: OnChange, floatingLabelText: "День рождения", hintText: "" }),
                    React.createElement(SelectField, { value: hasChildren, floatingLabelText: "Есть дети?", hintText: "Да/Нет", onChange: OnHasChildrenChange, floatingLabelFixed: true },
                        React.createElement(MenuItem, { value: "", label: "", primaryText: "" }),
                        React.createElement(MenuItem, { value: true, label: "Да", primaryText: "Да" }),
                        React.createElement(MenuItem, { value: false, label: "Нет", primaryText: "Нет" }))),
                React.createElement("div", { className: "p-c2" }),
                React.createElement("div", { className: "p-c1" },
                    React.createElement(TF, { name: "email", floatingLabelText: "Электронная почта", hintText: "any@mail.com", onChange: OnChange, value: email })))));
    }
}
export default Profile;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/Profile/Profile2.js.map