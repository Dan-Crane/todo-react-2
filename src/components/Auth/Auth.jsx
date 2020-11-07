import React, {useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import './Auth.scss'

import {Signup} from "./Signup/Signup";
import {Login} from "./Login/Login";
import {ForgotPassword} from "./ForgotPassword/ForgotPassword";

export const Auth = () => {
	return (
		<div className='auth'>
			<Switch>
				<Route
					path='/signup'
					component={Signup}/>
				<Route
					path='/login'
					component={Login}/>
				<Route
					path='/forgot-password'
					component={ForgotPassword}/>
				<Redirect to="/login"/>
			</Switch>
		</div>
	)
}
