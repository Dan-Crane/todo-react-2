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
	const list =  state.lists.find(i => i.id === match.params.listId) || {name: 'Задачи', hardCode: true}

	const getList = () => {
	}

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
			return  tasks.filter(task => task.dueDate)
		}
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

	if (!list || !tasks) return <div className='preloader-wrap'><PreloaderCircle/></div>

	return (
		<section className='body'>
			<TitleBody
				key={list.id}
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
