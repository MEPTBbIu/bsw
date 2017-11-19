import React, { ChangeEvent } from 'react'
import { EventHandler, Field, reduxForm, InjectedFormProps, EventOrValueHandler } from 'redux-form'
import normalizePhone from './normalizePhone'

const upper = value => value && value.toUpperCase();
const lower = value => value && value.toLowerCase();
const lessThan = otherField => (value, previousValue, allValues) =>
	parseFloat(value) < parseFloat(allValues[otherField]) ? value : previousValue;
const greaterThan = otherField => (value, previousValue, allValues) =>
	parseFloat(value) > parseFloat(allValues[otherField]) ? value : previousValue;

interface ITestFormProps {
	username?:string;
}

type TestFormProps = ITestFormProps & InjectedFormProps<{}, ITestFormProps >
const TestFormComp = class extends React.Component<TestFormProps> {

	constructor(props) {
		super(props);
		//this.handleOnChange;
	}
	handleOnChange: EventOrValueHandler<ChangeEvent<any>> = (ev) => {
		console.log(ev);
		let newState: ITestFormProps = { ...this.state };
		newState[ev.target.name] = ev.data;
		
		this.setState(newState);
	};
	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;
		
		return (
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username</label>
					<div>
						<Field
							name="username"
							component="input"
							type="text"
							placeholder="Username"
							normalize={lower} onChange={this.handleOnChange} valueOf={this.props.username}/>
					</div>
				</div>
				<div>
					<label>Shout</label>
					<div>
						<Field
							name="shout"
							component="input"
							type="text"
							placeholder="Shout something!"
							normalize={upper} onChange={this.handleOnChange}/>
					</div>
				</div>
				<div>
					<label>Phone</label>
					<div>
						<Field
							name="phone"
							component="input"
							type="text"
							placeholder="Phone Number"
							normalize={normalizePhone} onChange={this.handleOnChange}/>
					</div>
				</div>
				<div>
					<label>Min</label>
					<div>
						<Field
							name="min"
							component="input"
							type="number"
							normalize={lessThan('max')} onChange={this.handleOnChange}/>
					</div>
				</div>
				<div>
					<label>Max</label>
					<div>
						<Field
							name="max"
							component="input"
							type="number"
							normalize={greaterThan('min')} onChange={this.handleOnChange}/>
					</div>
				</div>
				<div>
					<button type="submit" disabled={submitting}>
						Submit
					</button>
					<button type="button" disabled={pristine || submitting} onClick={reset}>
						Clear Values
					</button>
				</div>
			</form>
		);
	}
}

export const TestForm = reduxForm<any,TestFormProps>({
	form: 'TestForm ', // a unique identifier for this form
	initialValues: { username:"", min: '1', max: '10' }
})(TestFormComp);
export default TestForm;
