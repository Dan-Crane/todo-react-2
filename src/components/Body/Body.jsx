import React, {useContext, useEffect, useState} from "react";

import './Body.scss'

import {TitleBody} from "./BodyTitile/BodyTitile";
import {BodyContent} from "./BodyContent/BodyContent";

import {DBContext} from "../../context/db";
import {useRouteMatch} from "react-router-dom";
import {apiFirebase} from "../../api/apiFirebase";

export const Body = () => {

	const db = useContext(DBContext)
	let match = useRouteMatch('/list/:listId?');

	const list = db.listsTest.find(i=>i.id === match.params.listId)


	const [tasksTest, setTasksTest] = useState([])


	useEffect(() => {
		apiFirebase('tasks')(collection =>
			collection.where('listId', '==', match.params.listId))
			.then(setTasksTest)
	}, [db, match.params.listId])

	return (
		<section className='body'>
			<TitleBody
				list={list}
				// title={lists.name}
				// 				 colorTitle={colorTitle}
				// 				 id={lists.id}
				// 				 onEditTitle={onEditTitle}
			/>
			<BodyContent tasksTest={tasksTest}
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
