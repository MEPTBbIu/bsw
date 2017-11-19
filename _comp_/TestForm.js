import React from 'react';
import { Field, reduxForm } from 'redux-form';
import normalizePhone from './normalizePhone';
const upper = value => value && value.toUpperCase();
const lower = value => value && value.toLowerCase();
const lessThan = otherField => (value, previousValue, allValues) => parseFloat(value) < parseFloat(allValues[otherField]) ? value : previousValue;
const greaterThan = otherField => (value, previousValue, allValues) => parseFloat(value) > parseFloat(allValues[otherField]) ? value : previousValue;
const TestFormComp = class extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnChange = (ev) => {
            console.log(ev);
            let newState = { ...this.state };
            newState[ev.target.name] = ev.data;
            this.setState(newState);
        };
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("div", null,
                React.createElement("label", null, "Username"),
                React.createElement("div", null,
                    React.createElement(Field, { name: "username", component: "input", type: "text", placeholder: "Username", normalize: lower, onChange: this.handleOnChange, valueOf: this.props.username }))),
            React.createElement("div", null,
                React.createElement("label", null, "Shout"),
                React.createElement("div", null,
                    React.createElement(Field, { name: "shout", component: "input", type: "text", placeholder: "Shout something!", normalize: upper, onChange: this.handleOnChange }))),
            React.createElement("div", null,
                React.createElement("label", null, "Phone"),
                React.createElement("div", null,
                    React.createElement(Field, { name: "phone", component: "input", type: "text", placeholder: "Phone Number", normalize: normalizePhone, onChange: this.handleOnChange }))),
            React.createElement("div", null,
                React.createElement("label", null, "Min"),
                React.createElement("div", null,
                    React.createElement(Field, { name: "min", component: "input", type: "number", normalize: lessThan('max'), onChange: this.handleOnChange }))),
            React.createElement("div", null,
                React.createElement("label", null, "Max"),
                React.createElement("div", null,
                    React.createElement(Field, { name: "max", component: "input", type: "number", normalize: greaterThan('min'), onChange: this.handleOnChange }))),
            React.createElement("div", null,
                React.createElement("button", { type: "submit", disabled: submitting }, "Submit"),
                React.createElement("button", { type: "button", disabled: pristine || submitting, onClick: reset }, "Clear Values"))));
    }
};
export const TestForm = reduxForm({
    form: 'TestForm ',
    initialValues: { username: "", min: '1', max: '10' }
})(TestFormComp);
export default TestForm;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/_comp_/TestForm.js.map