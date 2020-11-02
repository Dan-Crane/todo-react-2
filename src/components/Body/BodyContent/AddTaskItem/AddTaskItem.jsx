import React, {useState} from "react";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";

import './AddTaskItem.scss'

import {Input} from "../../../InputComponent/Input";
import {useOutsideAlerter} from "../../../../hooks/OutsideAlerter";

export const AddTaskItem = ({idList, onAddTask, onSubmit}) => {
	const [inputValue, setInputValue] = useState('')

	const {visible, setVisible, ref} = useOutsideAlerter(false)

	const toggleVisible = () => {
		setVisible(s => !s)
		setInputValue('')
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		e.stopPropagation()
		if(inputValue.length === 0) return
		onSubmit(inputValue)
		setInputValue('')
		toggleVisible()
	}

	return (
		<form onSubmit={event => event.preventDefault()} className='add-task-item'>
			<SwitchTransition mode='out-in'>
				<CSSTransition key={visible}
											 in={visible}
											 timeout={300}
											 classNames={'fade'}>
					<>
						{visible
							? <div className='add-task-item__form' ref={ref}>
								<div className='add-task-item__wrap-itp'>
									<Input placeholder='Название задачи' type='text' value={inputValue} setValue={setInputValue}/>
								</div>
								<button onClick={handleSubmit}
									className='add-task-item__btn-add main-btn'>
									Добавить задачу
								</button>
								<button onClick={toggleVisible}
												className='add-task-item__btn-close'>Отмена
								</button>
							</div>
							: <div onClick={toggleVisible}
										 className='add-task-item__wrapper'>
								<svg className="icon-plus-1 add-task-item__icon">
									<use xlinkHref="#icon-plus-1"/>
								</svg>
								<span className='add-task-item__title'>Новая задача</span>
							</div>}
					</>
				</CSSTransition>
			</SwitchTransition>
		</form>
	)
}
