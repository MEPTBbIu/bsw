import "./app.css";

//import "../assets/css/material.css";
import LoyaltyRegPage from "./LoyaltyRegPage";
import {App, AppProps} from "./Profile/Phone";
import PromoPage from "./PromoPage";
import { ProfileActions } from "../core/actions";
import { AppActions } from "../core/actions";
import { IdleTimeActions } from "../core/actions";
import * as React from "react";
import { ChangeEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {   TView, ViewMap, IProfileState , RootState } from "../core/store";
import { AppActions } from "../core/actions";




//type KK =  AppActions | IdleTimeActions| ProfileActions;

interface IAppProps   {
	initialValues?: RootState;
	currentView?: TView;
	views?: ViewMap;
//	updateProfileData?: any;
	wakeupApp?: any;
	setAppView?:any;
}

type AppProps = IAppProps ;

class App extends React.Component<IAppProps> {
	private views: ViewMap;


	constructor( props: IAppProps) {
		super(props);

		const { wakeupApp, initialValues, setAppView } = props;
		this.state = { ...initialValues };
		this.views = {
			...props.views,
			Promo: () => <PromoPage wakeupApp={wakeupApp}/>,
			Profile: () => <LoyaltyRegPage />
			};

	}

	handleUpdateProfileData = (data:IProfileState) => {
		//const newState = { ...this.state, profile: { ...this.state.profile, ...value } };
		//this.props.profileChanged(profile);
		this.setState({ profile: { ...data } });

	}


	render(): JSX.Element {

		const curView = this.views[this.props.currentView];

		return curView !== undefined ? curView() : <div/>;
	}
}


const state2props = (state: any,) => {
	return {
		currentView: state.app.currentView
	} as IAppProps;
};

const mapDispatchToProps = ( dispatch, props: IAppProps ): IAppProps => ( {
	...props,
	wakeupApp: ( regCode: string ) =>  dispatch(AppActions.wakeupApp())
} );

export const AppCon = connect( state2props, mapDispatchToProps )( App );
export default AppCon;

