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
import {Auth} from "../Auth/Auth";

const App = () => {
	const [isLoading, setIsLoading] = useState(true)
	const {state, actions} = useStore()

	useEffect(() => {
		if (state.user) {
			actions.getColors()
			actions.getLists(state.user.uid)
			actions.getTasks(state.user.uid)
		}
	}, [actions, state.user])

	return (
		<>
			{state.user
				? <div className="todo">
					<Navbar/>
					<div className='todo__body'>
						<Switch>
							<PrivateRoute exact path='/'
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
						</Switch>
					</div>
				</div>
				:
				<Auth/>
			}

		</>

	)
}

export default App;
