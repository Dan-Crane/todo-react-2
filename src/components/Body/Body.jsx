import React, {useState} from "react";
import {useLocation, useParams, useHistory} from 'react-router-dom'

import {useStore} from "../../hooks/store";

import './Body.scss'

import {TitleBody} from "./BodyTitile/BodyTitile";
import {BodyContent} from "./BodyContent/BodyContent";
import {PreloaderCircle} from "../PreloaderCircle/PreloaderCrcle";
import {TaskDetails} from "./TaskDetails/TaskDetails";


export const Body = ({match}) => {
	const {state, actions} = useStore()
	const [selectedTask, setSelectedTask] = useState(null)
	const list = match && state.lists.find(i => i.id === match.params.listId) || {name: 'Задачи'}


	// логика фильтра
	const path = match.path

	const getTaskByFilter = ({
		'/': tasks => tasks,
		'/important': tasks => tasks.filter(task => task.important),
		'/planned': tasks => tasks.filter(task=> task.dueDate)
	})


	const getTaskByList = (tasks, listId) => tasks.filter(task => task.listId === listId)
	//тут
	const tasks = match.params.listId ? getTaskByList(state.tasks, match.params.listId) : getTaskByFilter[path](state.tasks)

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

	const handleUpdate = (taskId, data) => {
		actions.updateTask(taskId, data)
	}

	const handleSelect = (task) => {
		setSelectedTask(task)
	}

	if (!list || !tasks) return <div className='preloader-wrap'><PreloaderCircle/></div>

	return (
		<section className='body'>
			<TitleBody
				list={list}
				onUpdate={handleUpdate}
			/>
			<BodyContent
				tasks={tasks}
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
