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
				<Redirect to='/auth'/>
				<Route path='/auth' component={Auth}/>
			</>
		)
	} else {
		return (
			<div className="todo">
				<Navbar/>
				<div className='todo__body'>
					<Switch>
						{/*<Route exact path='/'>*/}
						{/*	{lists && lists.length === 0*/}
						{/*		? <h2 className='todo__isnt-task'>Задачи отсутствуют</h2>*/}
						{/*		: lists && lists.map(item => <Body lists={item}*/}
						{/*																			 key={item.id}*/}
						{/*																			 onAddTask={onAddTask}*/}
						{/*																			 onEditTitle={onEditTitle}*/}
						{/*																			 colorTitle={item.color.hex}*/}
						{/*																			 onRemoveTask={onRemoveTask}*/}
						{/*																			 onEditTask={onEditTask}*/}
						{/*																			 onChangeChecked={onChangeChecked}*/}
						{/*																			 withoutEmpty={true}*/}
						{/*																			 sendState={sendState}/>)}*/}
						{/*</Route>*/}
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
