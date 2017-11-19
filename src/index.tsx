/// <reference path="./globals.d.ts"/>
/// <reference path="./augmentations.d.ts"/>


import "./assets/fonts/fonts.css";
import "./assets/css/normalize.css";

import  App  from "./components/app";
import { AppActions } from "./core/actions/app-actions";
import initialState from "./core/reducers/initialState";
import configureStore from "./core/store/configureStore";
//import "./index.css";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import { MuiThemeProvider } from "material-ui/styles";
import { blueGrey900, grey900 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";




injectTapEventPlugin();

const muiTheme = getMuiTheme( {
	palette: {
		accent1Color: blueGrey900,
		//accent2Color: grey900
	},
	textField: {
	},
	baseTheme: {
		spacing: {
			desktopKeylineIncrement: 90,
			desktopDropDownMenuFontSize: 22,
			desktopGutter: 30,
			iconSize: 38

		}
	}
} );

const store = configureStore(initialState);
store.dispatch(AppActions.startApp());
window.setTimeout(() => {

	return store.dispatch(AppActions.setAppStarted());
}, 2000);

ReactDom.render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}> 
			<App initialValues={initialState} />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById("root")
);

