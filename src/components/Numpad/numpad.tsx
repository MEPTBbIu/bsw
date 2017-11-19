/** Import React */
import * as React from 'react';

/** Stylesheet Imports */
import "./numpad.scss";

interface Props {
	children?: React.ReactNode;
	onChange?:React.EventHandler|(value:string)=>void;
}

interface State {
}

export class Numpad extends React.Component<Props> {
	public state: State;
	constructor(public props: Props) {
		super(props);
		this.state = {
		};
	}
	 numButton = ( id ) => ( <div key={"num-"+id} className="numpab-number-button">
			                   <span>id</span>
	 </div> );
	renderPads() {
		let result = [],
			i = 0;
		 while ( i < 10 ) result.push(this.numButton( i++ )); 
		return result;
	}
	render() {
		
		
		let i = 0;
			return (
				<div className="numpad-container">
					
					{ ...this.renderPads() }
					
			</div>
		);
	}
}

export default Numpad;