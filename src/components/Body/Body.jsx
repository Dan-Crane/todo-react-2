import React, {useState} from "react";

import {useStore} from "../../hooks/store";

import './Body.scss'

import {TitleBody} from "./BodyTitile/BodyTitile";
import {BodyContent} from "./BodyContent/BodyContent";
import {PreloaderCircle} from "../PreloaderCircle/PreloaderCrcle";
import {TaskDetails} from "./TaskDetails/TaskDetails";


export const Body = ({match}) => {
	const {state, actions} = useStore()
	const [selectedTask, setSelectedTask] = useState(null)
	//временно
	const [sortBy, setSortBy] = useState('')
	//
	const list = state.lists.find(i => i.id === match.params.listId) || {name: 'Задачи', hardCode: true}

	// логика фильтра
	const path = match.path

	const getTaskByFilter = ({
		'/': tasks => {
			list.name = 'Задачи'
			return tasks
		},
		'/important': tasks => {
			list.name = 'Важные'
			return tasks.filter(task => task.important)
		},
		'/planned': tasks => {
			list.name = 'Запланированные'
			return tasks.filter(task => task.dueDate)
		}
	})

	const getTaskByList = (tasks, listId) => tasks.filter(task => task.listId === listId)

	const tasks = match.params.listId ? getTaskByList(state.tasks, match.params.listId) : getTaskByFilter[path](state.tasks)

	const sortFn = {
		title: (a, b) => a.text.localeCompare(b.text),
		date: (a, b) => new Date(a.seconds * 1000) - new Date(b.seconds * 1000),
		important: (a, b) => b.important - a.important,
		completed: (a, b) => b.completed - a.completed,
	}

	//test
	//временно sortBy
	const sortedTasks = sortBy ? tasks.slice().sort(sortFn[sortBy]) : tasks

	//header
	const handleSortChange = (sort) => {
		setSortBy(sort)
		console.log(sort);
	}


	//body
	const handleSubmit = (text) => {
		actions.createTask({
			text,
			userId: state.user.uid,
			listId: list.id || ''
		})
	}

	const handleDelete = (taskId) => {
		actions.deleteTask(taskId)
	}

	const handleUpdate = (option, id, data) => {
		if (option === 'task') {
			return actions.updateTask(id, data)
		} else if (option === 'list') {
			return actions.updateList(id, data)
		}

	}

	const handleSelect = (task) => {
		setSelectedTask(task)
	}

	if (!list || !tasks || state.tasks.length === 0) return <div className='preloader-wrap'><PreloaderCircle/></div>

	return (
		<section className='body'>
			<TitleBody
				key={list.id}
				list={list}
				onUpdate={handleUpdate}
				onSortChange={handleSortChange}
			/>
			<BodyContent
				tasks={sortedTasks}
				onSelect={handleSelect}
				onSubmit={handleSubmit}
				onUpdate={handleUpdate}
				onDelete={handleDelete}
			/>
			{selectedTask &&
			<TaskDetails task={selectedTask}
									 onClose={handleSelect}/>
			}
		</section>
	)
}
