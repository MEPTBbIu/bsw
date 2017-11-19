import "./loyalty-reg-page.scss";
import Api from "../../common/api-http1c";
import { AppActions } from "../../core/actions/app-actions";
import { acUpdateProfile, wGetPhoneInfo, wLoadProfile } from "../../core/fsa-profile";
import { IProfileState, IProfileStatus, RootState } from "../../core/store";
import BusyBox from "../busybox";
import ProfileForm from "../profile";
import normalizePhone from "../Profile/phone/normalizePhone";
import RegCode from "../regcode/regcode";
import {
	Divider,
	LinearProgress,
	MenuItem,
	SelectField,
	TextField
	} from "material-ui";
import * as React from "react";
import { DispatchProp } from "react-redux";
import { connect } from "react-redux";
import { Dispatch } from "redux";





const paperStyle = {
	display: 'flex',
	padding: '28px',
	flexDirection: 'column',
	alignItems: 'center'
};

interface ILoyaltyRegProps extends DispatchProp<ILoyaltyRegProps> {
	profile?: IProfileState;
	getPhoneInfo?: (phone: string) => Promise<IProfileState>;
	checkRegCode?: (regCode: string) => Promise<IProfileState>;
	updateProfile?: (profile: IProfileState) => any;
}

class LoyaltyRegPage extends React.Component<ILoyaltyRegProps, { loadingEULA?: boolean; isEULALoaded?: boolean }> {
	constructor(props: ILoyaltyRegProps) {
		super(props);
	}

	onComplete = dispatch => dispatch(AppActions.setAppIdle());

	render() {
		const showLoader = false,
			p = this.props.profile,
			style = {
				Paper: {
					display: 'flex',
					padding: '28px',
					flexDirection: 'column',
					alignItems: 'center'
				}
			},
			{ status, regCode, error } = this.props.profile,
			content = !status.regCodeIsVerified ? (
				<RegCode checkRegCode={this.props.checkRegCode} updateProfile={this.props.updateProfile} error={p.error} regCode={p.regCode} status={p.status} />
			) : (
				<ProfileForm onComplete={AppActions.idleApp} profile={this.props.profile} getPhoneInfo={this.props.getPhoneInfo} updateProfile={this.props.updateProfile} />
			);
		return	<div className="freebirdFormviewerViewFormContentWrapper">
					<div className="freebirdFormviewerViewFormBanner freebirdHeaderMast">
						<div className="freebirdFormviewerViewNavigationHeaderButton">
							<div />
						</div>
					</div>
					<div className="freebirdFormviewerViewCenteredContent">
						<form>
							<div className="freebirdFormviewerViewFormCard">
								<div className="freebirdFormviewerViewAccentBanner freebirdAccentBackground" />
								<div className="freebirdFormviewerViewFormContent">{content}</div>
							</div>
						</form>
					</div>
				</div>
		;
	}
}
/*status={status} regCode={regCode} error={error}	<div className="bs-column">	</div>*/

const mapStateToProps = (state: RootState, props: ILoyaltyRegProps) => {
	return {
		profile: state.profile
	} as ILoyaltyRegProps;
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, props: ILoyaltyRegProps): ILoyaltyRegProps => {
	return {
		...props,
		checkRegCode: regCode => wLoadProfile(dispatch, regCode),
		updateProfile: profile => dispatch(acUpdateProfile(profile)),
		getPhoneInfo: phone => wGetPhoneInfo(dispatch, phone)
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LoyaltyRegPage);
