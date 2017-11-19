// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import {Router, Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import * as History from "history";

export default (<div>
	<Route path="/" component={App}/>
	<Route path="/home" component={Home}/>
</div>);