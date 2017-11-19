import "./regcode.css";
import * as React from "react";
import { connect } from "react-redux";
import { wLoadProfile } from "../../core/fsa-profile";
class RegCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            regCode: "266"
        };
    }
    startRegCodeVerify(ev) {
        this.props.checkRegCode(this.state.regCode);
    }
    onChange(ev) {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    }
    render() {
        return (React.createElement("div", null,
            "REG CODE",
            React.createElement("input", { name: "regCode", onChange: ev => this.onChange(ev), value: this.state.regCode }),
            React.createElement("button", { onClick: ev => this.startRegCodeVerify(ev) }, "REG CODE")));
    }
}
const mapStateToProps = (state, props) => {
    return {
        regCode: state.profile.regCode,
        regCodeIsVerified: state.profile.phoneIsVerified,
        isLoading: state.profile.isLoading
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    ...props,
    checkRegCode: (regCode) => wLoadProfile(dispatch, regCode)
});
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(RegCode);
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/regcode/regcode.js.map