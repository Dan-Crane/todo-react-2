import React from "react";

import {Route, Redirect} from 'react-router-dom'

export function PrivateRoute(props) {
	const {component: Component, user, ...rest} = props

	return <Route
		{...rest}
		render={props => {
			return user
				? <Component {...props}/>
				: <Redirect to='/login'/>
		}}/>
}