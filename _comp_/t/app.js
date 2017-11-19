import "./app.css";
import LoyaltyRegPage from "./LoyaltyRegPage";
import PromoPage from "./PromoPage";
import { AppActions } from "../core/actions";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
export let App = class extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdateProfileData = (data) => {
            this.setState({ profile: { ...data } });
        };
        const { wakeupApp, initialValues, setAppView } = props;
        this.state = { ...initialValues };
        this.views = {
            ...props.views,
            Promo: () => React.createElement(PromoPage, { wakeupApp: wakeupApp }),
            Profile: () => React.createElement(LoyaltyRegPage, null)
        };
    }
    render() {
        const curView = this.views[this.props.currentView];
        return (React.createElement("section", { id: "x-app-root", className: "bs-container" }, curView !== undefined ? curView() : undefined));
    }
};
const state2props = (state, p) => {
    return {
        currentView: state.app.currentView
    };
};
const D2PF = (d) => {
    return {
        ...bindActionCreators({ ...AppActions }, d),
    };
};
App = connect(state2props, D2PF)(App);
export default App;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/app.js.map