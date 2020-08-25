import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import App from "./components/App/App";

import { Provider, initialState, reducer, actions } from "./store";

ReactDOM.render(
	<Provider initialState={initialState} reducer={reducer} actions={actions}>
		<Router>
			<App/>
		</Router>
	</Provider>,
	document.getElementById('root')
);
