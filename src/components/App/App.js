import React, {useCallback, useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";

import './App.scss'
import '../../assets/style/styles.css'

import {Navbar} from "../Navbar/Navbar";
import {Body} from "../Body/Body";


const App = () => {

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
								 path='/list/:listId?'
								 component={Body}
					/>

					{/*<Route render={ () => <h1> 404 notfound </h1>} />*/}
					<Redirect to="/"/>

				</Switch>
			</div>
		</div>

	);
}

export default App;
