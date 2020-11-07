import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {useStore} from "../../hooks/store";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";

import './App.scss'
import '../../assets/style/styles.css'

import {Navbar} from "../Navbar/Navbar";
import {Body} from "../Body/Body";
import {Signup} from "../Auth/Signup/Signup";
import {ForgotPassword} from "../Auth/ForgotPassword/ForgotPassword";
import {Login} from "../Auth/Login/Login";

const App = () => {
	const [isLoading, setIsLoading] = useState(true)
	const {state, actions} = useStore()

	// useEffect(() => {
	// 	async function unsubscribe() {
	// 		await actions.setAuth()
	// 	}
	//
	// 	unsubscribe()
	// 		.then(_ =>{
	// 		setIsLoading(false)
	// 		console.log(state.user)
	//
	// 		})
	//
	// 	return () => unsubscribe()
	// }, [state.user])

	useEffect(() => {
		if (state.user) {
			actions.getColors()
			actions.getLists(state.user.uid)
			actions.getTasks(state.user.uid)
		}
	}, [actions, state.user])


	return (
				<div className="todo">
					{state.user && <Navbar/>}
					<div className='todo__body'>
						<Switch>
							<Route exact
										 path='/signup'
										 component={Signup}/>
							<Route exact
										 path='/login'
										 component={Login}/>
							<Route exact
										 path='/forgot-password'
										 component={ForgotPassword}/>
							<PrivateRoute path='/'
														user={state.user}
														component={Body}/>
							<PrivateRoute path='/important'
														user={state.user}
														component={Body}/>
							<PrivateRoute path='/planned'
														user={state.user}
														component={Body}/>
							<PrivateRoute path='/list/:listId/:taskId?'
														user={state.user}
														component={Body}/>

							<Redirect to="/"/>

						</Switch>
					</div>
				</div>
	)
}

export default App;
