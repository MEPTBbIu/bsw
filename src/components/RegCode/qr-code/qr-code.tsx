import * as React from 'react';
import Reader from 'react-qr-reader';

interface IState {
	delay?: number;
	result?: string;

}

export class QrReader extends React.Component<IState> {
	constructor(props) {
		super(props);
		this.state = {
			delay: 500,
			result: "No result",
		}

		//this.handleScan = this.handleScan.bind( this )
	}

	handleScan = (result: string) => {
		if (result) {
			this.setState({ result });
		}
	}
	handleError = (err) => {
		let result = JSON.stringify(err);
		this.setState({ result });
		console.error(err);
	}

	render() {
		const previewStyle = {
			height: 240,
			width: 320,
		};

		return (
			<div>
				<Reader
					delay={this.state.delay}
					style={previewStyle}
					onError={this.handleError}
					onScan={this.handleScan}/>
				<p>{this.state.result}</p>
			</div>
		);
	}

	
}

export default QrReader;