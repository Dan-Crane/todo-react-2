import React, {useContext, useEffect, useState} from "react";
import {useRouteMatch} from "react-router-dom";

import {useApi} from "../../hooks/api";

import './Body.scss'

import {TitleBody} from "./BodyTitile/BodyTitile";
import {BodyContent} from "./BodyContent/BodyContent";

import {PreloaderCircle} from "../PreloaderCircle/PreloaderCrcle";

export const Body = () => {
	const {data: {lists, tasks}, actions} = useApi()
	let match = useRouteMatch('/list/:listId?');
	const list = lists.find(i => i.id === match.params.listId)

	useEffect(() => {
		actions.getTasks(match.params.listId)
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

const handleUpdate = (taskId, data) =>{
		actions.updataTodo(taskId, data)
}

	if (!list || !tasks) return <div className='preloader-wrap'><PreloaderCircle/></div>

	return (
		<section className='body'>
			<TitleBody
				list={list}
				// title={lists.name}
				// 				 colorTitle={colorTitle}
				// 				 id={lists.id}
				// 				 onEditTitle={onEditTitle}
			/>
			<BodyContent
				onDelete={handleDelete}
				tasksTest={tasks}
				onSubmit={handleSubmit}
				onUpdate={handleUpdate}
				// 	idList={lists.id}
				// 					lists={lists}
				// 					onAddTask={onAddTask}
				// 					tasks={lists.tasks}
				// 					withoutEmpty={withoutEmpty}
				// 					onRemoveTask={onRemoveTask}
				// 					onEditTask={onEditTask}
				// 					onChangeChecked={onChangeChecked}
				// 					sendState={sendState}
			/>
		</section>
	)
}
