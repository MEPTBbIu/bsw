import * as React from 'react';
import { connect } from 'react-redux';
class MyComponent extends React.Component {
    render() {
        let n1done = true;
        return (React.createElement("div", { className: "bs-form" },
            React.createElement("div", { className: "bs-stepper" },
                React.createElement("div", { className: "bs-step" },
                    React.createElement("span", { className: "bs-step-header" },
                        React.createElement("span", { className: "checkpoint" },
                            React.createElement("svg", null,
                                n1done ?
                                    React.createElement("path", null) :
                                    React.createElement("circle", null),
                                React.createElement("text", { x: "12", y: "16" }, "1"))),
                        "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"),
                    React.createElement("div", { className: "bs-step-v-container" },
                        React.createElement("div", { className: "bs-step-content" }))),
                React.createElement("div", { className: "bs-step-v-spacer" },
                    React.createElement("span", null)),
                React.createElement("div", { className: "bs-step" },
                    React.createElement("span", { className: "bs-step-header" },
                        React.createElement("span", { className: "checkpoint" },
                            React.createElement("svg", null,
                                n1done ?
                                    React.createElement("path", null) :
                                    React.createElement("circle", null),
                                React.createElement("text", { x: "12", y: "16" }, "1"))),
                        "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"),
                    React.createElement("div", { className: "bs-step-v-container" },
                        React.createElement("div", { className: "bs-step-content" },
                            React.createElement("div", { id: "demo-tf-box-leading-wrapper" },
                                React.createElement("div", { id: "tf-box-leading-example", className: "mdc-textfield mdc-textfield--box mdc-textfield--with-leading-icon mdc-textfield--upgraded" },
                                    React.createElement("i", { className: "material-icons mdc-textfield__icon", tabIndex: 0 }, "event"),
                                    React.createElement("input", { type: "text", id: "tf-box-leading", className: "mdc-textfield__input custom-textfield-input" }),
                                    React.createElement("label", { htmlFor: "tf-box-leading", className: "mdc-textfield__label1 mdc-textfield__label--float-above" }, "Your name"),
                                    React.createElement("div", { className: "mdc-textfield__bottom-line", style: { transformOrigin: "148px center" } }),
                                    React.createElement("p", { className: "mdc-textfield-helptext mdc-textfield-helptext--validation-msg", id: "name-validation-msg" }, "Must be at least 8 characters"),
                                    "\t\t\t\t\t\t\t\t\t\t")),
                            React.createElement("div", { id: "demo-tf-box-wrapper" }),
                            React.createElement("div", { id: name, className: "bs-field" },
                                React.createElement("input", { type: "text" }),
                                React.createElement("label", { className: "label" }, "Test labes"),
                                React.createElement("hr", { className: "bs-input-underline", "aria-hidden": "true" }),
                                React.createElement("hr", { className: "bs-input-focus-line", "aria-hidden": "true" })))))),
            " "));
    }
}
function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps)(MyComponent);
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/_comp_/bs-stepper.js.map