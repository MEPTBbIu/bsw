import * as React from 'react';
import './stepbystep.scss';
/** Import React */

/** Stylesheet Imports */
export interface IStepMapItem {
	name: string;
	component:(next?:() => void) => React.ReactNode;
}

interface IStepByStepProps {
	showNavigation?: boolean;
	steps?: Array<IStepMapItem>;
	//children?: React.ReactNode;
	initialStep?: number;
}

interface IStepState {
	current: number;
	styles: string[];
}

interface IStepByStepState {
	showPreviousBtn?: boolean;
	showNextBtn?: boolean;
	compState?: number;
	navState?: IStepState;
}

/*class _StepByStep extends React.Component<StepByStepProps> {
	public state: IStepByStepState;

	constructor( public props: StepByStepProps) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (<div> {this.props.children } </div >
		);
	}
}	*/

//export default StepByStep;
// tslint:disable:indent

const name = {key:"value"};
export class StepByStep extends React.Component<IStepByStepProps,IStepByStepState> {
	//readonly state: IStepByStepState;

	readonly hidden: React.CSSProperties = {
		display: 'none'
	};

	constructor( props = { showNavigation: true, steps:[] } as IStepByStepProps) {
		super(props);
		this.state = {
			showPreviousBtn: false,
			showNextBtn: true,
			compState: 0,
			navState: this.getNavStates(0, props.steps.length)
		};
	}

	getNavStates(indx: number, length: number): IStepState {
		let styles = [];
		for (let i = 0; i < length; i++) {
			if (i < indx) {
				styles.push('done');
			} else if (i === indx) {
				styles.push('doing');
			} else {
				styles.push('todo');
			}
		}
		return { current: indx, styles: styles };
	}

	checkNavState(currentStep: number) {
		if (currentStep > 0 && currentStep < this.props.steps.length - 1) {
			this.setState({
				showPreviousBtn: true,
				showNextBtn: true
			});
		} else if (currentStep === 0) {
			this.setState({
				showPreviousBtn: false,
				showNextBtn: true
			});
		} else {
			this.setState({
				showPreviousBtn: true,
				showNextBtn: false
			});
		}
	}

	setNavState = (next: number) => {
		this.setState({ navState: this.getNavStates(next, this.props.steps.length) });
		if (next < this.props.steps.length) {
			this.setState({ compState: next });
		}
		this.checkNavState(next);
	}

	handleKeyDown = (evt) =>{

		if (evt.which === 13) {
			this.next();
		}
	}

	handleOnClick = (evt)=> {
		if (evt.currentTarget.value === (this.props.steps.length - 1) &&
			this.state.compState === (this.props.steps.length - 1)) {
			this.setNavState(this.props.steps.length);
		} else {
			this.setNavState(evt.currentTarget.value);
		}
	}

	next= ()=> {
		this.setNavState(this.state.compState + 1);
	}

	previous = () => {
		if (this.state.compState > 0) {
			this.setNavState(this.state.compState - 1);
		}
	}

	getClassName(className, i) {
		return className + "-" + this.state.navState.styles[i];
	}

	renderSteps() {
		return this.props.steps.map((s, i) => (
			<li className={this.getClassName("progtrckr", i)} onClick={this.handleOnClick} key={i} value={i}>
				<em> {i + 1}</em>
				<span> {this.props.steps[i].name} </span >
			</li>
		));
	}

	render() {

		return (
			<div className="container" onKeyDown={this.handleKeyDown}>
				<ol className="progtrckr">
					{this.renderSteps()}
				</ol>
				{this.props.steps[this.state.compState].component(this.next)}
				<div style={this.props.showNavigation ? {} : this.hidden}>
					<button style={this.state.showPreviousBtn ? {} : this.hidden}
							className="multistep__btn--prev"
							onClick={this.previous}> Previous </button >
					<button style={this.state.showNextBtn ? {} : this.hidden}
							className="multistep__btn--next"
							onClick={this.next}>Next</button >
				</div>
			</div>);
	}
}

export default StepByStep;