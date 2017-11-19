import "./loyalty-reg-page.scss";
import * as React from "react";
import StepByStep from "../stepbystep";
import RegSteps from "./reg-steps";
class LoyaltyRegPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }
    render() {
        return (React.createElement(StepByStep, { initialStep: 1, showNavigation: true, steps: RegSteps }));
    }
}
export default LoyaltyRegPage;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/LoyaltyRegPage/loyalty-reg-page.js.map