import React, {useCallback, useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";

import './App.scss'
import '../../assets/style/styles.css'

import {Navbar} from "../Navbar/Navbar";
import {Body} from "../Body/Body";

import {api} from "../../api/api";
import {apiFirebase} from "../../api/apiFirebase";

import {db} from '../../firebase'

import {DBContext} from '../../context/db'

const App = () => {

	const [lists, setLists] = useState([])
	const [colors, setColors] = useState(null)
	const [activeList, setActiveList] = useState(null)
	const [sendState, setSendState] = useState(null)
	let history = useHistory();
	let location = useLocation();

	const getList = useCallback(() => {
		api.getLists()
			.then(res => setLists(res))
	}, [])

	const getColors = useCallback(() => {
		api.getColors()
			.then(res => setColors(res))
	}, [])

	useEffect(() => {
		getList()
		getColors()
	}, [getList, getColors])

	useEffect(() => {
		const listId = location.pathname.split('/list/')[1]
		if (lists) {
			const list = lists.find(l => l.id === Number(listId))
			setActiveList(list)
		}
	}, [lists, location.pathname])

	const addList = (body) => {
		const newlist = [...lists, body]
		setLists(newlist)
	}

	const onRemoveList = (item) => {
		const idx = lists.findIndex(i => i === item)
		const newList = [...lists.slice(0, idx), ...lists.slice(idx + 1)]
		setLists(newList)
		onAllActiveList()
	}

	const onActiveList = item => {
		history.push(`/list/${item.id}`)
	}

	const onAllActiveList = () => {
		history.push(`/`)
	}

	const onEditTitle = (title, id) => {
		const newList = lists.map(l => l.id === id ? {...l, name: title} : l)
		setLists(newList)
	}

	const onAddTask = (id, task) => {
		const newList = lists.map(l => l.id === id ? {...l, tasks: [...l.tasks, task]} : l)
		// const test = lists.map(l => {
		// 	if (l.id === id) {
		// 		l.tasks = [...l.tasks, task]
		// 	}
		// 	return l
		// })
		setLists(newList)
	}

	const onRemoveTask = (idList, idTask) => {
		if (window.confirm('Вы действительно хотете удалить задачу?')) {
			api.removeTask(idTask)
				.then(() => {
					const newList = lists.map(l => {
						if (l.id === idList) {
							l.tasks = l.tasks.filter(i => i.id !== idTask)
						}
						return l
					})
					setLists(newList)
				})
				.catch(() => alert('Не удалось удалить задачу'))
		}
	}

	const onEditTask = (idList, taskObj) => {
		api.editTask(taskObj)
			.then(() => {
				const newLists = lists.map(l => {
					if (l.id === idList) {
						const newTasks = [...l.tasks]
						newTasks.map(task => {
							if (task.id === taskObj.id) {
								task.text = taskObj.text
							}
							return task
						})

					}
					return l
				})
				setLists(newLists)
			})
			.catch(() => {
				alert('Ошибка при изменении')
			})
	}

	const onChangeChecked = (idTask, idList, checked) => {
		setSendState(idTask)
		api.editCompleted(idTask, checked)
			.then(res => {
				const newLists = lists.map(list => list.id === idList
					? {...list, tasks: [...list.tasks.map(task => task.id === idTask ? {...task, completed: checked} : task)]}
					: list)
				setLists(newLists)
			})
			.catch(() => {
				alert('Ошибка при изменении состояния')
			})
			.finally(() => {
				setSendState(null)
			})
	}

	const [listsTest, setListsTest] = useState([])

	useEffect(() => {
		apiFirebase('lists')().then(setListsTest)

	}, [])

	return (
		<DBContext.Provider value={{listsTest, apiFirebase}}>
			<div className="todo">
				<Navbar lists={lists}
								addList={addList}
								onRemoveList={onRemoveList}
								onActiveList={onActiveList}
								onAllActiveList={onAllActiveList}
								activeList={activeList}
								colors={colors}
								activeLocation={location.pathname}/>
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
									 path='/list/:listId?'
									 component={Body}
									 // render={()=> <Body/>}
									/>
						{/*<Route render={ () => <h1> 404 notfound </h1>} />*/}
						<Redirect to="/"/>

					</Switch>
				</div>
			</div>
		</DBContext.Provider>

	);
}

export default App;
