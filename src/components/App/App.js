import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import './App.scss'
import '../../assets/style/styles.css'

import {Navbar} from "../Navbar/Navbar";
import {Body} from "../Body/Body";
import {Auth} from "../Auth/Auth";

import {useStore} from "../../hooks/store";

const App = () => {
	const {state, actions} = useStore()

	useEffect(() => {
		actions.setAuth()
	}, [actions])

	useEffect(() => {
		if (state.user) {
			actions.getColors()
			actions.getLists(state.user.uid)
			actions.getTasks(state.user.uid)
		}
	}, [actions, state.user])

	if (!state.user) {
		return (
			<>
				<Route path='/auth' component={Auth}/>
				<Redirect to='/auth'/>
			</>
		)
	} else {
		return (
			<div className="todo">
				<Navbar/>

				<div className='todo__body'>
					<Switch>
						<Route exact
									 path='/'
									 component={Body}
						/>
						<Route exact
									 path='/important'
									 component={Body}
						/>
						<Route exact
									 path='/planned'
									 component={Body}
						/>
						<Route exact
									 path='/list/:listId/:taskId?'
									 component={Body}
						/>

						{/*<Route render={ () => <h1> 404 notfound </h1>} />*/}
						<Redirect to="/"/>

					</Switch>
				</div>
			</div>
		)
	}
}

export default App;
