import * as React from 'react';
import './stepbystep.scss';
const name = { key: "value" };
export class StepByStep extends React.Component {
    constructor(props = { showNavigation: true, steps: [] }) {
        super(props);
        this.hidden = {
            display: 'none'
        };
        this.setNavState = (next) => {
            this.setState({ navState: this.getNavStates(next, this.props.steps.length) });
            if (next < this.props.steps.length) {
                this.setState({ compState: next });
            }
            this.checkNavState(next);
        };
        this.handleKeyDown = (evt) => {
            if (evt.which === 13) {
                this.next();
            }
        };
        this.handleOnClick = (evt) => {
            if (evt.currentTarget.value === (this.props.steps.length - 1) &&
                this.state.compState === (this.props.steps.length - 1)) {
                this.setNavState(this.props.steps.length);
            }
            else {
                this.setNavState(evt.currentTarget.value);
            }
        };
        this.next = () => {
            this.setNavState(this.state.compState + 1);
        };
        this.previous = () => {
            if (this.state.compState > 0) {
                this.setNavState(this.state.compState - 1);
            }
        };
        this.state = {
            showPreviousBtn: false,
            showNextBtn: true,
            compState: 0,
            navState: this.getNavStates(0, props.steps.length)
        };
    }
    getNavStates(indx, length) {
        let styles = [];
        for (let i = 0; i < length; i++) {
            if (i < indx) {
                styles.push('done');
            }
            else if (i === indx) {
                styles.push('doing');
            }
            else {
                styles.push('todo');
            }
        }
        return { current: indx, styles: styles };
    }
    checkNavState(currentStep) {
        if (currentStep > 0 && currentStep < this.props.steps.length - 1) {
            this.setState({
                showPreviousBtn: true,
                showNextBtn: true
            });
        }
        else if (currentStep === 0) {
            this.setState({
                showPreviousBtn: false,
                showNextBtn: true
            });
        }
        else {
            this.setState({
                showPreviousBtn: true,
                showNextBtn: false
            });
        }
    }
    getClassName(className, i) {
        return className + "-" + this.state.navState.styles[i];
    }
    renderSteps() {
        return this.props.steps.map((s, i) => (React.createElement("li", { className: this.getClassName("progtrckr", i), onClick: this.handleOnClick, key: i, value: i },
            React.createElement("em", null,
                " ",
                i + 1),
            React.createElement("span", null,
                " ",
                this.props.steps[i].name,
                " "))));
    }
    render() {
        return (React.createElement("div", { className: "container", onKeyDown: this.handleKeyDown },
            React.createElement("ol", { className: "progtrckr" }, this.renderSteps()),
            this.props.steps[this.state.compState].component(this.next),
            React.createElement("div", { style: this.props.showNavigation ? {} : this.hidden },
                React.createElement("button", { style: this.state.showPreviousBtn ? {} : this.hidden, className: "multistep__btn--prev", onClick: this.previous }, " Previous "),
                React.createElement("button", { style: this.state.showNextBtn ? {} : this.hidden, className: "multistep__btn--next", onClick: this.next }, "Next"))));
    }
}
export default StepByStep;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/stepbystep/stepbystep.js.map