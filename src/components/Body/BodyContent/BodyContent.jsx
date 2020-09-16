import React from "react";

import './BodyContent.scss'

import {AddTaskItem} from "./AddTaskItem/AddTaskItem";
import {TaskItem} from "./TaskItem/TaskItem";

export const BodyContent = ({tasks, onSubmit, onDelete, onUpdate, onSelect}) => {
	return (
		<div className='body__item-tasks body-content'>
			{tasks.map(t => {
				return (<TaskItem
					task={t}
					key={t.id}
					onSelect={onSelect}
					onUpdate={onUpdate}
					onDelete={onDelete}/>)
			})}
			<AddTaskItem onSubmit={onSubmit}/>
		</div>
	)
}
