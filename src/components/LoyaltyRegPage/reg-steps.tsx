import * as React from "react";
import  RegCode from "../regcode";
import Profile  from "../profile";
import  TermsOfPDU  from "../termsofpdu";
import  Gratters  from "../gratters";
import { IStepMapItem } from "../StepByStep";



const steps: Array<IStepMapItem> =
[
	{ name: "REG_CODE", component:(next) =>( <RegCode doNextStep={next}/>) },
		{ name: "PROFILE", component: ( next ) =>(<Profile/>) },
		{ name: "TERMS_PDU", component: ( next ) =><TermsOfPDU/> },
		{ name: "GRATTERS", component: ( next ) =><Gratters/> }
];

export default  steps;