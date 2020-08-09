import {useState, useEffect} from 'react'
import *as apiFirebase from '../api/apiFirebase'

export const useApi = () => {
	const [lists, setLists] = useState([])
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		apiFirebase.getLists().then(setLists)

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
			deleteTask
		},
	}
}
