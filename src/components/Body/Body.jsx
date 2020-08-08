import React, {useContext, useEffect, useState} from "react";

import './Body.scss'

import {TitleBody} from "./BodyTitile/BodyTitile";
import {BodyContent} from "./BodyContent/BodyContent";

import {DBContext} from "../../context/db";
import {useRouteMatch} from "react-router-dom";
import {PreloaderCircle} from "../PreloaderCircle/PreloaderCrcle";

export const Body = () => {
	const db = useContext(DBContext)
	let match = useRouteMatch('/list/:listId?');
	const list = db.listsTest.find(i => i.id === match.params.listId)
	const [tasksTest, setTasksTest] = useState([])

	useEffect(() => {
		setTasksTest()

		list && db.getTasks(list.id)
			.then(setTasksTest)
	}, [db, match.params.listId])

	const handleSubmit = (text) => {
		db.createTask({
			text,
			listId: list.id
		})
			.then(task => {
				setTasksTest([...tasksTest, task])
			})
	}

	const handleDelete = (taskId) => {
		db.deleteTask(taskId)
		setTasksTest([...tasksTest.filter(t => t.id !== taskId)])
	}

	if (!list || !tasksTest) return <div className='preloader-wrap'><PreloaderCircle/></div>

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
				tasksTest={tasksTest}
				onSubmit={handleSubmit}
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
