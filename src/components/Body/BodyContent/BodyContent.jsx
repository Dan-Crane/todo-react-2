import React, {useContext, useEffect, useState} from "react";
import {useRouteMatch} from "react-router-dom";

import './BodyContent.scss'

import {AddTaskItem} from "./AddTaskItem/AddTaskItem";
import {TaskItem} from "./TaskItem/TaskItem";
import {DBContext} from "../../../context/db";
import {apiFirebase} from "../../../api/apiFirebase";

export const BodyContent = ({tasksTest}) => {
	return (
		<div className='body__item-tasks body-content'>
			{/*{!withoutEmpty && tasks && !tasks.length && <h2 className='item-task__isnt-task'>Задачи отсутствуют</h2>}*/}

			{/*{tasks && tasks.map(t => <TaskItem {...t} key={t.id}*/}
			{/*																	 idList={idList}*/}
			{/*																	 onRemoveTask={onRemoveTask}*/}
			{/*																	 onEditTask={onEditTask}*/}
			{/*																	 completed={t.completed}*/}
			{/*																	 onChangeChecked={onChangeChecked}*/}
			{/*																	 sendState={sendState}/>)}*/}
			{tasksTest.map(t => {
				// console.log(t)
				return (<TaskItem key={t.id} {...t}/>)
			})}

			<AddTaskItem />
		</div>
	)
}