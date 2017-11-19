import * as React from 'react';
import { deepOrange500 } from 'material-ui/styles/colors';
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
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = () => {
        };
        this.state = {
            step: props.startStep || 0
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(TestForm, null),
            React.createElement(RegForm, null)));
    }
}
export default Home;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/_comp_/home.js.map