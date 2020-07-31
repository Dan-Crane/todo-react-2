import React, {useState} from "react";

import './ItemBody.scss'

import {AddTaskItem} from "./AddTaskItem/AddTaskItem";
import {TaskItem} from "./TaskItem/TaskItem";

export const ItemBody = ({tasks, idList, onAddTask, withoutEmpty, onRemoveTask, onEditTask}) => {

	return (
		<div className='body__item-tasks item-task'>
			{!withoutEmpty && tasks && !tasks.length && <h2 className='item-task__isnt-task'>Задачи отсутствуют</h2>}

			{tasks && tasks.map(t => <TaskItem {...t} key={t.id}
																idList={idList}
																onRemoveTask={onRemoveTask}
																onEditTask={onEditTask}/>)}

			<AddTaskItem key={idList} onAddTask={onAddTask}
									 idList={idList}/>
		</div>
	)
}
