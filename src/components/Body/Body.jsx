import React, {useContext, useEffect, useState} from "react";
import {useRouteMatch} from "react-router-dom";

import {useApi} from "../../hooks/api";

import './Body.scss'

import {TitleBody} from "./BodyTitile/BodyTitile";
import {BodyContent} from "./BodyContent/BodyContent";

import {PreloaderCircle} from "../PreloaderCircle/PreloaderCrcle";
import {TaskDetails} from "./TaskDetails/TaskDetails";

export const Body = ({match}) => {
	const [selectedTask, setSelectedTask] = useState(null)
	const {data: {lists, tasks}, actions} = useApi()
	const list = lists.find(i => i.id === match.params.listId)

	useEffect(() => {

		if (match.params.listId) {
			actions.getTasks(match.params.listId)
		} else {
			actions.getLists()
		}
	}, [actions, match.params.listId])

	const handleSubmit = (text) => {
		actions.createTask({
			text,
			listId: list.id
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
				// title={lists.name}
				// colorTitle={colorTitle}
				// id={lists.id}
				// onEditTitle={onEditTitle}
			/>
				<BodyContent
					tasksTest={tasks}
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
				<TaskDetails/>
				}
		</section>
	)
}
