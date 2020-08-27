import React, {useEffect, useState} from "react";

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

	useEffect(() => {
		setSelectedTask(null)
		if (match.params.listId) {
			actions.getListTasks(match.params.listId)
		} else if (match.url === '/important') {
			actions.getImportantTasks(state.user.uid)
		} else if (match.url === '/planned') {
			actions.getPlannedTasks(state.user.uid)
		} else if (match.url === '/') {
			actions.getTasks(state.user.uid)
		}
	}, [actions, match.url])

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

	if (!list || !state.tasks) return <div className='preloader-wrap'><PreloaderCircle/></div>

	return (
		<section className='body'>
			<TitleBody
				list={list}
				// title={lists.name}
				// colorTitle={colorTitle}
				// id={lists.id}
				// onEditTitle={onEditTitle}
			/>
			<BodyContent
				tasks={state.tasks}
				onSelect={handleSelect}
				onSubmit={handleSubmit}
				onUpdate={handleUpdate}
				onDelete={handleDelete}
				// idList={lists.id}
				// lists={lists}
				// onAddTask={onAddTask}
				// tasks={lists.tasks}
				// withoutEmpty={withoutEmpty}
				// onRemoveTask={onRemoveTask}
				// onEditTask={onEditTask}
				// onChangeChecked={onChangeChecked}
				// sendState={sendState}
			/>
			{selectedTask &&
					<TaskDetails task={selectedTask}
											 onClose={handleSelect}/>
			}
		</section>
	)
}
