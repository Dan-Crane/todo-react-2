import React, {useState} from "react";

import './ItemBody.scss'
import {AddTaskItem} from "./AddTaskItem/AddTaskItem";

export const ItemBody = ({ tasks, idList, onAddTask, withoutEmpty }) => {
	const [editMode, setEditMode] = useState(null)
	const [valueItem, setValueItem] = useState('')

	const onEditItem = (item) => {
		setEditMode(item)
		setValueItem(item.text)
	}

	const itemChangeValue = (e) => {
		setValueItem(e.target.value)
	}

	const onSubmitForm = e => {
		e.preventDefault()

		console.log('hi')
	}

	const onFocusChange = (e) => {
		setEditMode(null)
		onSubmitForm(e)
	}

	return (
		<div className='body__item-tasks item-task'>
			{!withoutEmpty && !tasks.length && <h2 className='item-task__isnt-task'>Задачи отсутствуют</h2>}
			{tasks.map(t => {
				return (
					<div key={t.id} className='item-task__row'>
						<div className='item-task__checkbox'>
							<input id={`check-${t.id}`} type='checkbox'/>
							<label htmlFor={`check-${t.id}`}>
								<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5"
												strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</label>
						</div>
						{editMode && editMode.id === t.id
							? <form className='item-task__form'
											onSubmit={onSubmitForm}>
								<input className='item-task__input'
											 value={valueItem}
											 onChange={e => itemChangeValue(e)}
											 autoFocus={true}
											 onBlur={onFocusChange}
								/>
								<button> ok</button>
							</form>
							: <span onClick={() => {
								onEditItem(t)
							}}
											className='item-task__text'>{t.text}</span>
						}

					</div>
				)
			})}
			<AddTaskItem onAddTask={onAddTask}
									 idList={idList}/>
		</div>
	)
}
