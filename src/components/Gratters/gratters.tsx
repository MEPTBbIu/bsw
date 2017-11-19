/** Import React */
import * as React from 'react';

/** Stylesheet Imports */
import './gratters.scss';

interface Props {
	children?: React.ReactNode;
}

interface State {
}

class Gratters extends React.Component<Props> {
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

export default Gratters;