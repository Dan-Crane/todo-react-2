import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import App from "./components/App/App";

import {Provider, initialState, reducer, actions} from "./store";
import {AuthProvider} from "./store/AuthProvider";

ReactDOM.render(
	<AuthProvider>
		<Provider initialState={initialState} reducer={reducer} actions={actions}>
			<Router>
				<App/>
			</Router>
		</Provider>
	</AuthProvider>,
	document.getElementById('root')
);
