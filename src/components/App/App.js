import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Route, useHistory, useLocation} from "react-router-dom";

import DB from '../../assets/db.json'

import './App.scss'

import {Navbar} from "../Navbar/Navbar";
import {Body} from "../Body/Body";
import {api} from "../../api/api";

const App = () => {

	const [lists, setLists] = useState(null)
	const [colors, setColors] = useState(null)
	const [activeList, setActiveList] = useState(null)
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
		const listId = location.pathname.split('lists/')[1]
		if (lists) {
			const list = lists.find(l => l.id === Number(listId))
			setActiveList(list)
		}
	}, [lists, location.pathname])

	const addList = (body) => {
		const newlist = [...lists, body]
		// getList()
		setLists(newlist)
	}

	const onRemoveList = (item) => {
		const idx = lists.findIndex(i => i === item)
		const newList = [...lists.slice(0, idx), ...lists.slice(idx + 1)]
		setLists(newList)
	}

	const onActiveList = item => {
		history.push(`/lists/${item.id}`)
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
		console.log(idList, taskObj)
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


	return (
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
				<Route exact path='/'>
					{lists && lists.map(item => <Body lists={item}
																						key={item.id}
																						onAddTask={onAddTask}
																						onEditTitle={onEditTitle}
																						colorTitle={item.color.hex}
																						onRemoveTask={onRemoveTask}
																						onEditTask={onEditTask}
																						withoutEmpty/>)}
				</Route>
				<Route path='/lists/:id'>
					{lists && activeList && <Body lists={activeList}
																				colorTitle={activeList.color.hex}
																				onAddTask={onAddTask}
																				onRemoveTask={onRemoveTask}
																				onEditTitle={onEditTitle}
																				onEditTask={onEditTask}/>}
				</Route>
			</div>

		</div>
	);
}

export default App;
