import React, {useState} from "react";

import './AddTaskItem.scss'

import addSvg from '../../../../assets/icons/add.svg'

export const AddTaskItem = ({idList, onAddTask, onSubmit}) => {
	const [visible, setVisible] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [isSending, setIsSending] = useState(false)

	const toggleVisible = () => {
		setVisible(s => !s)
		setInputValue('')
	}

	// const addTask = (e) => {
	// 	e.preventDefault()
	{/*	if(!inputValue){*/
	}
	{/*		return alert('Введите задачу')*/
	}
	{/*	}*/
	}
	{/*	const obj = {*/
	}
	// 		listId: idList,
	// 		text: inputValue,
	// 		completed: false
	// 	}
	// 	setIsSending(true)
	// 	api.addTask(idList, obj)
	// 		.then(({data}) => {
	// 			onAddTask(idList, data)
	// 			toggleVisible()
	{/*		})*/
	}
	// 		.catch(() => {
	// 			alert('Ошибка при добавлении задачи')
	// 		})
	// 		.finally(() => {
	// 			setIsSending(false)
	// 		})
	// }
	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(inputValue)
		setInputValue('')
	}

	return (
		<form onSubmit={handleSubmit} className='add-task-item'>
			{visible
				? <div className='add-task-item__form'>
					<input className='main-input add-task-item__input'
								 placeholder='Текст задачи'
								 value={inputValue}
								 autoFocus={true}
								 onChange={(e) => setInputValue(e.target.value)}
								 type="text"/>
					<button disabled={isSending}
									className='add-task-item__btn-add main-btn'>
						{isSending ? 'Добавление...' : 'Добавить задачу'}</button>
					<button onClick={toggleVisible}
									className='add-task-item__btn-close'>Отмена
					</button>
				</div>
				: <div onClick={toggleVisible}
							 className='add-task-item__wrapper'>
					<abbr className='add-task-item__icon' data-icon="e"></abbr>
					{/*<img className='add-task-item__icon'*/}
					{/*		 src={addSvg}*/}
					{/*		 alt="Добавить список"/>*/}
					<span className='add-task-item__title'>Новая задача</span>
				</div>}

		</form>
	)
}
