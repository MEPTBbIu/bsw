import * as React from "react";
import { connect } from "react-redux";
import { wGetPhoneInfo } from "../../core/fsa-profile";
class ProfileDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props.profile };
    }
    componentDidMount() {
    }
    onChange(ev) {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    }
    doGetPhoneInfo(ev) {
        this.props.getPhoneInfo("79037477611");
    }
    render() {
        return React.createElement("div", null,
            React.createElement("p", null, "PROFILE"),
            React.createElement("button", { onClick: (ev) => this.doGetPhoneInfo(ev) }, "PHONE INFO"));
    }
}
const mapStateToProps = (state, props) => {
    return {
        profile: state.profile
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    ...props,
    getPhoneInfo: (phone) => dispatch(wGetPhoneInfo(phone))
});
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ProfileDisplay);
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/profile/test.js.map