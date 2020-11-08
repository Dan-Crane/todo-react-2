import React, {useState} from "react";
import DatePicker from "react-datepicker";

import './TaskDetails.scss'
import "react-datepicker/dist/react-datepicker.css";

import {Input} from "../../InputComponent/Input";

export const TaskDetails = ({task, onClose}) => {
	const [startDate, setStartDate] = useState(task.dueDate.seconds * 1000);
	// console.log(moment(task.dueDate.seconds * 1000).format('DD. MM. YYYY h:mm'))
	console.log(task)
	return (
		<div className='task-details'>
			<h3 className='task-details__title'>Детали задачи:</h3>
			<Input placeholder='Название задачи'
						 value={task.text}
						 type='text'/>
			<DatePicker selected={startDate}
									onChange={date => setStartDate(date)}
									dateFormat="dd/MM/yyyy"/>

			<svg className="icon-closesvg task-details__close"
					 onClick={() => onClose(null)}>
				<use xlinkHref="#icon-closesvg"/>
			</svg>
		</div>
	)
}
