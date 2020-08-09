import React, {useState} from "react";

import './TaskItem.scss'

import {PreloaderCircle} from "../../../PreloaderCircle/PreloaderCrcle";
import {ControlButtons} from "./ControlButtons/ControlButtons";
import {useOutsideAlerter} from "../../../../hooks/OutsideAlerter";

export const TaskItem = ({
													 onRemoveTask, idList, onEditTask, onChangeChecked, sendState,

													 taskId, text, completed, onDelete,
												 }) => {

	/*
	completed
	taskId
	listId
	text
	* */

	const [editMode, setEditMode] = useState(false)
	const [valueItem, setValueItem] = useState(text)
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
	const cancelEditMode = () => {
		setValueItem(text)
		setEditMode(false)
		// setVisible(false)
	}

	const doneEdit = () => {
		onEditTask(idList, {taskId, text: valueItem})
		setEditMode(false)
		// setVisible(false)
	}

	const onChecked = (e) => {
		onChangeChecked(taskId, idList, e.target.checked);
	}

	const handleClick = () => {
		setVisible(s => !s)
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
				<> <input id={`check-${taskId}`}
									onChange={onChecked}
									checked={completed}
									type='checkbox'/>
					<label htmlFor={`check-${taskId}`}>
						<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5"
										strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</label></>

			</div>
			<form className='body-content__form'
						onSubmit={onSubmitForm}>
				{!editMode
					? <span className='body-content__text'>{text}</span>
					: <input className='body-content__input'
									 value={valueItem}
									 onChange={e => itemChangeValue(e)}
									 autoFocus={true}/>
				}

				<div className='body-content__control-btn-wrap control-btn-wrap'>
					<div data-icon="k"
							 className={`control-btn-wrap__tog-show-btn ${btnShowStyle}`}
							 onClick={handleClick}></div>

					{visible && <div ref={ref} className={`control-btn-wrap__popup ${btnShowStyle}`}>
						<ControlButtons
							onDelete={onDelete}
							taskId={taskId}

							editMode={editMode}
							doneEdit={doneEdit}
							cancelEditMode={cancelEditMode}
							onRemoveTask={onRemoveTask}
							idList={idList}
							setEditMode={setEditMode}
							visible/>
					</div>}
				</div>


			</form>
			<div className='body-content__wrap'>
				<ControlButtons
					onDelete={onDelete}
					taskId={taskId}

					editMode={editMode}
					doneEdit={doneEdit}
					cancelEditMode={cancelEditMode}
					onRemoveTask={onRemoveTask}
					idList={idList}
					setEditMode={setEditMode}
					visible/>
			</div>

		</div>
	)
}

