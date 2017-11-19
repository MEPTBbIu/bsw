import * as React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RegForm from "./reg-form";
import TestForm from "./TestForm";

const styles = {
	container: {
		textAlign: 'center',
		height: "100%",
	}
};

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500,
	},
});

interface IHomeProps {
	startStep?: number;
}

interface IHomeData {
	step?: number;
}

class Home extends React.Component<IHomeProps, IHomeData> {

	handleOnSubmit=() =>{

	}
	constructor (props: IHomeProps) {
		super(props);
		this.state = {
			step: props.startStep || 0
		}
	}

	render () {
		return (<div>
				<TestForm/>
			<RegForm  />
			</div>
		);

	}
}



export default Home;
