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
	const list = state.lists.find(i => i.id === match.params.listId) || {name: 'Задачи'}

	console.log(state);

	// логика фильтра
	const path = match.path

	const getTaskByFilter = ({
		'/': tasks => tasks,
		'/important': tasks => tasks.filter(task => task.important),
		'/planned': tasks => tasks.filter(task=> task.dueDate)
	})


	const getTaskByList = (tasks, listId) => tasks.filter(task => task.listId === listId)

	const tasks = match.params.listId ? getTaskByList(state.tasks, match.params.listId) : getTaskByFilter[path](state.tasks)
	// const test = tasks.slice()
	// const test2 = [...tasks]
	// console.log(test);
	// console.log(test2);

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
