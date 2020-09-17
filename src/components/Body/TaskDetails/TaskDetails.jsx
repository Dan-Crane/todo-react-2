import React from "react";

import moment from "moment";

import './TaskDetails.scss'

import {Input} from "../../InputComponent/Input";

export const TaskDetails = ({task, onClose}) => {
	// console.log(moment(task.dueDate.seconds * 1000).format('DD. MM. YYYY h:mm'))
	console.log(task)
	return (
		<div className='task-details'>
			<h3 className='task-details__title'>Детали задачи:</h3>
			<Input placeholder='Название задачи'
						 text={task.text}
						 type='text'/>
			{task.dueDate &&
			<Input placeholder='Дата выполнения'
						 text={moment(task.dueDate.seconds * 1000).format('DD. MM. YYYY h:mm') }
						 type='datetime-local'/>
			}
			<abbr className='task-details__close'
						data-icon="g"
						tabIndex='0'
						onClick={() => onClose(null)}/>
		</div>
	)
}
