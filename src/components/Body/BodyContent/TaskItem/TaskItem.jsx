import React, {useState} from "react";

import './TaskItem.scss'

import {useOutsideAlerter} from "../../../../hooks/OutsideAlerter";

export const TaskItem = ({
													 onRemoveTask, idList, onEditTask, onChangeChecked, sendState,
//new props
													 task, onDelete, onUpdate, onSelect
												 }) => {
	const [editMode, setEditMode] = useState(false)
	const [valueItem, setValueItem] = useState(task.text)
	const {visible, setVisible, ref} = useOutsideAlerter(false)

	let btnShowStyle = ''
	if (visible) btnShowStyle += ' active'
	if (!visible) btnShowStyle += ' disable'

	const itemChangeValue = (e) => {
		setValueItem(e.target.value)
	}
	const onSubmitForm = e => {
		e.preventDefault()
	}

// новый функционал
	const handleChange = (e) => {
		onUpdate(task.id, {completed: e.target.checked})
	}

	return (
		<div className='body-content__row'>
			<div className='body-content__checkbox'>
				{/*//условие на загрузку*/}
				{/*{sendState === id*/}
				{/*	? <PreloaderCircle/>*/}
				{/*	: <> <input id={`check-${id}`}*/}
				{/*							onChange={onChecked}*/}
				{/*							checked={completed}*/}
				{/*							type='checkbox'/>*/}
				{/*		<label htmlFor={`check-${id}`}>*/}
				{/*			<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
				{/*				<path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5"*/}
				{/*							strokeLinecap="round" strokeLinejoin="round"/>*/}
				{/*			</svg>*/}
				{/*		</label></>}*/}
				<> <input id={`check-${task.id}`}
									onChange={(e) => handleChange(e)}
									checked={task.completed}
									type='checkbox'/>
					<label htmlFor={`check-${task.id}`}>
						<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5"
										strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</label></>

			</div>
			<form className='body-content__form'
						onSubmit={onSubmitForm}>
				{!editMode
					? <span className='body-content__text'>{task.text}</span>
					: <input className='body-content__input'
									 value={valueItem}
									 onChange={itemChangeValue}
									 autoFocus={true}/>
				}

				<div className='body-content__wrap-btn wrap-btn'>
					<abbr data-icon={task.important ? 'z' : 'y'}
								className={`wrap-btn__important ${task.important && 'active'}`}
								onClick={(e) => onUpdate(task.id, {important: !task.important})}/>
					<abbr data-icon="i"
								className='wrap-btn__delete'
								onClick={() => onDelete(task.id)}/>
					<abbr data-icon="k"
								className='wrap-btn__details'
								onClick={() => onSelect(task)}/>
				</div>
			</form>
		</div>
	)
}

