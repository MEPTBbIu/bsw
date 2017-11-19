import * as  React from 'react';
import  {Component, ReactHTML} from 'react';
import {connect} from 'react-redux';

class MyComponent extends React.Component {
	
	render() {
		let n1done = true;
		return (
			<div className="bs-form">
				<div className="bs-stepper">
					<div className="bs-step">
						<span className="bs-step-header">
							<span className="checkpoint">
								<svg>{n1done ?
									<path></path> :
									<circle></circle>}
									<text x="12" y="16">{"1"}</text>
								</svg>
							</span>
							Заголовок
							</span>
						<div className="bs-step-v-container">
							<div className="bs-step-content">
							</div>
						</div>
					</div>
					<div className="bs-step-v-spacer"><span /></div>
					<div className="bs-step">
						<span className="bs-step-header">
							<span className="checkpoint">
								<svg>{n1done ?
									<path></path> :
									<circle></circle>}
									<text x="12" y="16">{"1"}</text>
								</svg>
							</span>
							Заголовок
							</span>
						<div className="bs-step-v-container">
							<div className="bs-step-content">
								<div id="demo-tf-box-leading-wrapper">
									<div id="tf-box-leading-example"
										className="mdc-textfield mdc-textfield--box mdc-textfield--with-leading-icon mdc-textfield--upgraded">
										<i className="material-icons mdc-textfield__icon" tabIndex={0}>event</i>
										<input type="text" id="tf-box-leading"
											className="mdc-textfield__input custom-textfield-input" />
										<label htmlFor="tf-box-leading" className="mdc-textfield__label1 mdc-textfield__label--float-above">Your
												name</label>
										<div className="mdc-textfield__bottom-line"
											style={{ transformOrigin: "148px center" }}></div>
										<p className="mdc-textfield-helptext mdc-textfield-helptext--validation-msg"
											id="name-validation-msg">
											Must be at least 8 characters
											</p>										</div>
								</div>

								<div id="demo-tf-box-wrapper">


								</div>
								<div id={name} className="bs-field">
									<input type="text" />
									<label className="label">Test labes</label>
									<hr className="bs-input-underline" aria-hidden="true" />
									<hr className="bs-input-focus-line" aria-hidden="true" />
								</div>
							</div>
						</div>
					</div>
				</div> </div>

		);
	}
}

function mapStateToProps (state) {
	return {};
}

export default connect(
	mapStateToProps,
)(MyComponent);

