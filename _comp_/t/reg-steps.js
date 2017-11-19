import * as React from "react";
import RegCode from "../regcode";
import Profile from "../profile";
import TermsOfPDU from "../termsofpdu";
import Gratters from "../gratters";
const steps = [
    { name: "REG_CODE", component: (next) => (React.createElement(RegCode, { doNextStep: next })) },
    { name: "PROFILE", component: (next) => (React.createElement(Profile, null)) },
    { name: "TERMS_PDU", component: (next) => React.createElement(TermsOfPDU, null) },
    { name: "GRATTERS", component: (next) => React.createElement(Gratters, null) }
];
export default steps;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/LoyaltyRegPage/reg-steps.js.map