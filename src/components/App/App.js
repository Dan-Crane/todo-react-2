import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios'

import DB from '../../assets/db.json'

import './App.scss'

import {Navbar} from "../Navbar/Navbar";
import {Body} from "../Body/Body";
import {api} from "../../api/api";

const App = () => {

	const [lists, setLists] = useState(null)
	const [colors, setColors] = useState(null)
	const [activeList, setActiveList] = useState(null)

	useEffect(() => {
		api.getLists()
			.then(res => setLists(res))
		api.getColors()
			.then(res => setColors(res))
	}, [])

	const addList = (body) => {
		const newlist = [...lists, body]
		setLists(newlist)
	}

	const onRemoveList = (item) => {
		const idx = lists.findIndex(i => i === item)
		const newList = [...lists.slice(0, idx), ...lists.slice(idx + 1)]
		setLists(newList)
	}

	const onActiveList = item => {
		setActiveList(item)
	}

	const onEditTitle = (title, id) => {
		const newList = lists.map(l => l.id === id ? {...l, name: title} : l)
		setLists(newList)
	}
	window.lists = lists
	const onAddTask = (id, task) => {
		// const newList = lists.map(l => l.id === id ? {...l, tasks: [...l.tasks, task]} : l)
		const test = lists.map(l => {
			if (l.id === id) {
				l.tasks = [...l.tasks, task]
			}
			return l
		})
		setLists(test)
	}

	return (
		<div className="todo">
			<Navbar lists={lists}
							addList={addList}
							onRemoveList={onRemoveList}
							onActiveList={onActiveList}
							activeList={activeList}
							colors={colors}/>
			{lists && activeList && <Body lists={activeList}
																		onAddTask={onAddTask}
																		onEditTitle={onEditTitle}/>}
		</div>
	);
}

export default App;
