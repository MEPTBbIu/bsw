/** Import React */
import * as React from 'react';

/** Stylesheet Imports */
import './termsofpdu.scss';

interface Props {
	children?: React.ReactNode;
}

interface State {
}

class TermsOfPDU extends React.Component<Props> {
	public state: State;
	constructor(public props: Props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div>{ this.props.children }</div>
		);
	}
}

export default TermsOfPDU;