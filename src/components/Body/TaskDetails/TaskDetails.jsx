import React from "react";

import './TaskDetails.scss'

import {Input} from "../../InputComponent/Input";

export const TaskDetails = ({task, onClose}) => {
	console.log(task)
	return (
		<div className='task-details'>
			<h3 className='task-details__title'>Детали задачи:</h3>
			<Input placeholder='Название задачи'
						 text={task.text}/>
			<abbr className='task-details__close'
						data-icon="g"
						onClick={() => onClose(null)}/>
		</div>
	)
}
