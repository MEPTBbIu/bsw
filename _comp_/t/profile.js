import './profile.scss';
import * as React from 'react';
import { Paper } from 'material-ui';
import LinearProgress from "material-ui/LinearProgress";
import MenuItem from "material-ui/MenuItem";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import normalizePhone from "../normalizePhone";
const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});
const Styles = {
    Default: {
        TextField: {
            root: {
                fontSize: "16px",
                lineHeight: "24px",
                height: "72px",
                width: "256px"
            },
            hintText: { textAlign: "center", width: "100%" },
            inputStyle: { textAlign: "center" },
            floatingLabel: { textAlign: "center", width: "100%" },
            floatingLabelFocused: { width: "auto", textAlign: "left" },
        },
        SelectField: {
            root: {
                fontSize: "16px",
                lineHeight: "24px",
                height: "72px",
                width: "256px"
            },
            floatingLabel: { textAlign: "center", width: "100%" },
            floatingLabelFocused: { width: "auto", textAlign: "left" },
            menuItem: {}
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
                margin: "0 14px 0 14px",
                flex: "1 1 auto",
                alignItems: "center"
            }
        }
    },
    Large: {
        BsFloatRow: {
            root: {
                margin: "8px"
            }
        },
        TextField: {
            root: {
                fontSize: "24px",
                lineHeight: "36px",
                height: "108px",
                width: "348px"
            },
            hintText: {
                textAlign: "center",
                width: "100%",
                fontSize: "16px"
            }
        },
        SelectField: {
            root: {
                fontSize: "24px",
                lineHeight: "36px",
                height: "108px",
                width: "348px"
            },
            menuItem: {
                height: "94px",
                lineHeight: "94px",
                paddingRight: "84px",
                top: "9px",
                textAlign: "center",
                width: "100%"
            },
            floatingLabel: { textAlign: "center", width: "100%" },
            floatingLabelFocused: { width: "auto", textAlign: "left" },
        },
        BsDateField: {
            root: {
                display: "flex",
                flexDirection: "column"
            },
            inputStyle: {
                textAlign: "center",
                width: "100%",
                margin: "0 0 19px 0px",
                alignItems: "flex-end"
            }
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
    divider: {
        height: "1px",
        width: "100%",
        borderTop: "rgba(0,0,0,0.17) solid 1px",
        boxSizing: "border-box",
        borderWidth: "0.8px 0 0 0",
        margin: "28px 0"
    },
    divider2: {
        width: "60%",
        margin: "28px auto 0"
    },
    _row2columns: {
        display: "inline-flex",
        flexDirection: " row",
        flexFlow: "row wrap",
        margin: "26px",
        flex: "0 1 auto",
        justifyContent: "space-evenly",
    },
    _floatColumn: {
        display: "flex",
        flexDirection: "column",
        margin: "0 14px 0 14px",
        flex: "1 1 auto",
        alignItems: "center",
    },
    column: { display: "flex", flexDirection: "column", alignItems: "center" },
    row: { display: "flex", flexDirection: "row", alignItems: "center" }
};
const BsSvgIcon_Woman = () => {
    const svgStyle = {
        userSelect: "none",
        space: "preserve",
        color: "rgb(255, 64, 129)",
        position: "relative",
        fontSize: "24px",
        display: "inline-block",
        transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
        verticalAlign: "middle",
        marginLeft: "12px",
        marginRight: "0px",
    };
    return React.createElement("i", { style: svgStyle },
        React.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "32px", height: "32px", viewBox: "0 0 32 32" },
            React.createElement("circle", { cx: "30.5", cy: "29.5", r: "1.5" }),
            React.createElement("circle", { cx: "19.5", cy: "29.5", r: "1.5" }),
            React.createElement("path", { d: "M46.285,38.533c-3.727-4.789-3.217-8.872-2.677-13.195C43.801,23.795,44,22.2,44,20.568c0-6.535-2.925-14.147-11.128-14.4  C29.398,2.732,26.008,2,23.749,2C12.801,2,6,8.809,6,19.77c0,1.561,0.211,3.116,0.435,4.763c0.604,4.442,1.227,9.036-2.443,14.021  c-0.162,0.22-0.227,0.496-0.18,0.766s0.202,0.507,0.43,0.659c0.167,0.111,4.154,2.714,13.25,3.72C19.795,46.477,22.45,48,25,48  c2.563,0,5.225-1.528,7.531-4.314c9.094-1.017,13.314-3.578,13.491-3.688c0.241-0.149,0.408-0.394,0.458-0.673  S46.46,38.757,46.285,38.533z M25,46c-2.026,0-4.23-1.375-6.208-3.872c-0.008-0.01-0.021-0.015-0.03-0.025  c-0.005-0.005-0.007-0.013-0.013-0.018C18.702,42.041,14,37.572,14,31c0-5.004,4.304-6.04,8.101-6.954  c0.785-0.189,1.525-0.367,2.195-0.575c4.49-1.392,6.639-4.359,7.562-6.14C33.343,18.909,36,22.53,36,28.28  c0,7.673-4.749,13.791-4.797,13.853c-0.008,0.01-0.009,0.023-0.017,0.033C29.217,44.637,27.023,46,25,46z" })));
};
const BsSvgIcon_Man = () => {
    const svgStyle = {
        userSelect: "none",
        color: "rgb(255, 64, 129)",
        position: "relative",
        fontSize: "24px",
        display: "inline-block",
        transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
        verticalAlign: "middle",
        marginLeft: "12px",
        marginRight: "0px",
    };
    return React.createElement("div", { style: svgStyle },
        React.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "32px", height: "32px", viewBox: "0 0 32 32" },
            React.createElement("circle", { cx: "30.5", cy: "28.5", r: "1.5" }),
            React.createElement("circle", { cx: "19.5", cy: "28.5", r: "1.5" }),
            React.createElement("g", null,
                React.createElement("g", null,
                    React.createElement("path", { fill: "none", stroke: "#000000", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-miterlimit": "10", d: "    M38.269,25.739C38.964,23.61,40,19.885,40,16c0-3.183-1.419-9-7-9c-0.94-1.724-3.466-4-8.277-4C15.02,3,10,8.637,10,17.596    c0,1.681,1.01,6.231,1.673,8.143c-0.568,0.353-1.907,1.473-1.673,3.464c0.437,3.708,3.276,4.726,3.276,4.726    c0.296,2.831,3.674,9.108,8.401,11.295C22.395,46.295,23.614,47,25,47c1.387,0,2.607-0.706,3.325-1.778    c4.709-2.19,8.044-8.463,8.341-11.293c0,0,2.862-0.982,3.3-4.69C40.2,27.249,38.838,26.092,38.269,25.739z" }))),
            React.createElement("g", null,
                React.createElement("g", null,
                    React.createElement("path", { d: "M12,27c-0.227,0-0.447-0.077-0.624-0.219l-0.327-0.261c-0.147-0.118-0.259-0.275-0.321-0.454    C10.062,24.145,9,19.488,9,17.596C9,7.685,14.731,2,24.723,2c5.426,0,7.92,2.646,8.847,4.019C38.67,6.365,41,11.354,41,16    c0,3.05-0.6,6.431-1.781,10.049c-0.134,0.412-0.518,0.69-0.95,0.69c-2.54,0-3.25-2.973-3.269-4.729    c0-3.135-1.534-6.08-2.506-7.629C31.26,15.845,28.652,18,24,18c-4.939,0-8.374,0.878-9,4C14.656,23.716,13.972,27,12,27z" })))));
};
const BsSvgDivEnd = () => {
    const svgStyle = {
        userSelect: "none",
        space: "preserve",
        width: "100%",
        height: "100%"
    };
    return React.createElement("svg", { style: svgStyle, x: "0px", y: "0px", viewBox: "0 0 360 10" },
        React.createElement("polygon", { fill: "#DAD9D9", points: `359,0 359,7.5 352.5,0.5 345,8.5 337.5,0.5 330,8.5 322.5,0.5 315,8.5 307.5,0.5 300,8.5 292.5,0.5 285,8.5 277.5,0.5 270,8.5 262.5,0.5 255,8.5 247.5,0.5 240,8.5 232.5,0.5 225,8.5 217.5,0.5 210,8.5 202.5,0.5 195,8.5 187.5,0.5 180,8.5 172.5,0.5 165,8.5 157.5,0.5 150,8.5 142.5,0.5 135,8.5 127.5,0.5 120,8.5 112.5,0.5 105,8.5 97.5,0.5 90,8.5 82.5,0.5 75,8.5 67.5,0.5
							60,8.5 52.5,0.5 45,8.5 37.5,0.5 30,8.5 22.5,0.5 15,8.5 7.5,0.5 1,7.5 1,0 0,0 0,10 7.5,2 15,10 22.5,2 30,10 37.5,2 45,10 52.5,2 60,10 67.5,2 75,10 82.5,2 90,10 97.5,2 105,10 112.5,2 120,10 127.5,2 135,10 142.5,2 150,10 157.5,2 165,10 172.5,2 180,10 187.5,2 195,10 202.5,2 210,10 217.5,2 225,10 232.5,2 240,10 247.5,2 255,10 262.5,2 270,10 277.5,2 285,10 292.5,2 300,10 307.5,2 315,10 322.5,2 330,10 337.5,2 345,10 352.5,2 360,10 360,0` }));
};
const BsTextField = ({ name, labelText, hintText, onChange, value, errorText = undefined, required = false, type = "text", labelFixed = false, fullWidth = false, large = true, pattern }) => {
    let styles = { ...Styles.Default.TextField };
    styles = large && Styles.Large.TextField
        ? {
            ...styles,
            root: { ...Styles.Large.TextField.root },
            hintText: { ...Styles.Large.TextField.hintText }
        }
        : styles;
    styles.root = fullWidth ? { ...styles.root, minWidth: styles.root.width, width: "100%" } : styles.root;
    return React.createElement(TextField, { pattern: pattern, style: styles.root, name: name, floatingLabelFixed: labelFixed, value: value, inputStyle: styles.inputStyle, floatingLabelStyle: styles.floatingLabel, floatingLabelFocusStyle: styles.floatingLabelFocused, floatingLabelShrinkStyle: styles.floatingLabelFocused, floatingLabelText: labelText, hintStyle: styles.hintText, hintText: hintText, errorText: errorText, onChange: onChange, required: required, type: type });
};
const BsDateField = ({ name, labelText, hintText, onChange, value, errorText, required = false, labelFixed = false, fullWidth = false, large = true, pattern }) => {
    let styles = { ...Styles.Default.TextField };
    styles = large && Styles.Large.TextField
        ? {
            ...styles,
            root: { ...Styles.Large.TextField.root, ...Styles.Large.BsDateField.root },
            hintText: { ...Styles.Large.TextField.hintText },
            inputStyle: { ...Styles.Large.BsDateField.inputStyle }
        }
        : styles;
    styles.root = fullWidth ? { ...styles.root, minWidth: styles.root.width, width: "100%" } : styles.root;
    return React.createElement(TextField, { pattern: pattern, style: styles.root, name: name, floatingLabelFixed: labelFixed, value: value, inputStyle: styles.inputStyle, floatingLabelStyle: styles.floatingLabel, floatingLabelFocusStyle: styles.floatingLabelFocused, floatingLabelShrinkStyle: styles.floatingLabelFocused, floatingLabelText: labelText, hintStyle: styles.hintText, hintText: hintText, errorText: errorText, onChange: onChange, required: required, type: "date" });
};
const BsSelectField = ({ name, labelText, hintText, onChange, value, children, errorText = undefined, labelFixed = false, fullWidth = false, large = true }) => {
    let styles = { ...Styles.Default.TextField };
    styles = large && Styles.Large.SelectField
        ? {
            ...styles,
            root: { ...Styles.Large.SelectField.root },
            menuItem: { ...Styles.Large.SelectField.menuItem }
        }
        : styles;
    styles.root = fullWidth ? { ...styles.root, minWidth: styles.root.width, width: "100%" } : styles.root;
    return React.createElement(SelectField, { style: styles.root, name: name, value: value, onChange: onChange, floatingLabelText: labelText, floatingLabelStyle: (value !== undefined && value !== "") ? styles.floatingLabelFocused : styles.floatingLabel, floatingLabelFixed: labelFixed, hintStyle: styles.floatingLabel, hintText: hintText, labelStyle: styles.menuItem }, children);
};
const BsFloatColumn = ({ children, fullWidth = false, large = true }) => {
    let root = { ...Styles.Default.BsFloatColumn.root };
    root = large && Styles.Large.BsFloatColumn ? { ...root, ...Styles.Large.BsFloatColumn.root } : root;
    return React.createElement("div", { name: "COLUMN", style: root }, children);
};
const BsFloatRow = ({ children, fullWidth = false, large = true }) => {
    let root = { ...Styles.Default.BsFloatRow.root };
    root = large && Styles.Large.BsFloatRow ? { ...root, ...Styles.Large.BsFloatRow.root } : root;
    return React.createElement("div", { name: "ROW", style: root }, children);
};
export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.handleSendSMS = () => {
            let state = {};
            state.smsIsSended = true;
            state.sendedSmsCode = "33756";
            this.setState(state);
        };
        this.handleValidateSMS = () => {
            let state = { ...this.state,
                phoneIsValid: this.state.smsCode === this.props.sendedSmsCode };
            if (state.phoneIsValid !== this.state.phoneIsValid)
                this.setState(state);
        };
        this.handleChange = (ev) => {
            const state = { ...this.state };
            state[ev.target.name] = ev.target.value;
            this.setState(state);
        };
        this.handlePhoneChange = (event, value) => {
            this.phoneText = normalizePhone(value);
            const phoneValue = this.phoneText.replace(/[^\d]/g, "");
            this.setState({ phone: phoneValue });
        };
        this.handleGenderChange = (event, index, value) => {
            this.setState({ gender: value });
        };
        this.handleHasChildrenChange = (event, index, value) => {
            this.setState({ hasChildren: value });
        };
        this.state = { ...props.initialValues };
        this.phoneText = normalizePhone(this.state.phone);
    }
    render() {
        const tstyles = {
            block: {
                maxWidth: 250,
            },
            checkbox: {
                marginBottom: 16,
            },
        };
        return (React.createElement(MuiThemeProvider, { muiTheme: muiTheme },
            React.createElement(Paper, { style: Styles.Default.Paper.root },
                React.createElement("div", { style: commonStyles.root },
                    React.createElement(BsFloatRow, null,
                        React.createElement(BsFloatColumn, null,
                            React.createElement(BsTextField, { name: "phone", value: this.phoneText, labelText: "Номер телефона", hintText: "Cемь цифр телефонa без 8 и +7.", onChange: this.handlePhoneChange, required: true, fullWidth: true }),
                            React.createElement(LinearProgress, { style: { ...Styles.Default.TextFieldProgress.root, display: "none" }, mode: "indeterminate" })),
                        React.createElement(BsFloatColumn, null,
                            React.createElement(BsTextField, { name: "email", value: this.state.email, labelText: "Электронная почта", hintText: "any@mail.com", onChange: this.handleChange, fullWidth: true }))),
                    React.createElement("div", { style: commonStyles.divider2 }),
                    React.createElement(BsFloatRow, null,
                        React.createElement(BsFloatColumn, null,
                            React.createElement(BsTextField, { name: "lastName", value: this.state.lastName, labelText: "Фамилия", onChange: this.handleChange, fullWidth: true }),
                            React.createElement(BsTextField, { name: "firstName", value: this.state.firstName, labelText: "Имя", onChange: this.handleChange, fullWidth: true }),
                            React.createElement(BsTextField, { name: "midName", value: this.state.midName, labelText: "Отчество", onChange: this.handleChange, fullWidth: true })),
                        React.createElement(BsFloatColumn, null,
                            React.createElement(BsSelectField, { name: "gender", value: this.state.gender, onChange: this.handleGenderChange, labelText: "Пол", hintText: "Мужской/ Женский", fullWidth: true },
                                React.createElement(MenuItem, { value: "", label: "", primaryText: "" }),
                                React.createElement(MenuItem, { value: "male", label: "Мужской", primaryText: "Мужской" }),
                                React.createElement(MenuItem, { value: "female", label: "Женский", primaryText: "Женский" })),
                            React.createElement(BsDateField, { labelFixed: false, type: "date", name: "birthday", value: this.state.birthday, onChange: this.handleChange, labelText: "День рождения", fullWidth: true, pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}" }),
                            React.createElement(BsSelectField, { name: "_hasChildren", value: this.state.hasChildren, labelText: "Есть дети?", onChange: this.handleHasChildrenChange, hintText: "Да/Нет", fullWidth: true },
                                React.createElement(MenuItem, { value: "", label: "", primaryText: "" }),
                                React.createElement(MenuItem, { value: true, label: "Да", primaryText: "Да" }),
                                React.createElement(MenuItem, { value: false, label: "Нет", primaryText: "Нет" }))))))));
    }
}
export default Profile;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/Profile/profile.js.map