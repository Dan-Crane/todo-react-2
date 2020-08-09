import {useState, useEffect} from 'react'
import *as apiFirebase from '../api/apiFirebase'

export const useApi = () => {
	const [lists, setLists] = useState([	{
		"color": "blue",
		"colorId": 3,
		"name": "Книги",
		"id": 1
	}])
	const [tasks, setTasks] = useState([    {
		"listId": 1,
		"text": "тест",
		"completed": false,
		"id": 1
	}])

	useEffect(() => {
		// apiFirebase.getLists().then(setLists)

	}, [])



	const getLists = () => {
		return apiFirebase.getLists()
			.then(setLists)
	}

	const getTasks = (listId) => {
		return apiFirebase.getTasks(listId)
			.then(setTasks)
	}

	const createTask = (data) => {
		return apiFirebase.createTask(data)
			.then(task => {
				setTasks([...tasks, task])
			})
	}

	const updataTodo = (taskId, data) => {
		return apiFirebase.updataTodo(taskId, data)
			.then(data => {
				setTasks([...tasks.map(t => {
					return t.id !== taskId
						? {...t, ...data}
						: t
				})])
			})
	}

	const deleteTask = (taskId) => {
		return apiFirebase.deleteTask(taskId)
			.then(taskId => {
				setTasks([...tasks.filter(t => t.id !== taskId)])
			})
	}

	return {
		data: {
			lists,
			tasks
		},
		actions: {
			getLists,
			getTasks,
			createTask,
			updataTodo,
			deleteTask
		},
	}
}
