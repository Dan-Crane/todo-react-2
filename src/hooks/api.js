import {useState, useEffect, useMemo} from 'react'
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

	const updateTask = (taskId, data) => {
		return apiFirebase.updateTask(taskId, data)
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

	const actions = useMemo(() => ({
		getLists,
		getTasks,
		createTask,
		updateTask,
		deleteTask
	}), [])

	return {
		data: {
			lists,
			tasks
		},
		actions
	}
}
