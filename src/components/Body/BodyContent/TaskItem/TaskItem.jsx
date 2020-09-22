import React from "react";

import './TaskItem.scss'
import {ControlBox, ControlItem} from "../../../ControlBox/ControlBox";
import {CSSTransition, SwitchTransition} from "react-transition-group";

export const TaskItem = ({task, onDelete, onUpdate, onSelect}) => {

	const onSubmitForm = e => {
		e.preventDefault()
	}

// новый функционал
	const handleChange = (e) => {
		onUpdate('task', task.id, {completed: e.target.checked})
	}

	return (
		<div className='body-content__row'>
			<div className='body-content__checkbox'>
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
				<span className='body-content__text'>{task.text}</span>

				<ControlBox>
					<SwitchTransition>
						<CSSTransition key={task.important}
													 in={task.important}
													 timeout={300}
													 classNames='star-animation'>

							{task.important
								? <ControlItem icon={<svg className="icon-star-4">
									<use xlinkHref="#icon-star-4"/>
								</svg>}
															 color={'#FF8905'}
															 sendFunc={() => {
																 onUpdate('task', task.id, {important: !task.important})
															 }}/>
								: <ControlItem icon={<svg className="icon-star-empty-1">
									<use xlinkHref="#icon-star-empty-1"/>
								</svg>}
															 sendFunc={() => {
																 onUpdate('task', task.id, {important: !task.important})
															 }}/>}
						</CSSTransition>
					</SwitchTransition>

					<ControlItem icon={<svg className="icon-times">
						<use xlinkHref="#icon-times"/>
					</svg>}
											 sendFunc={() => onDelete(task.id)}/>

					<ControlItem icon={<svg className="icon-dots-2">
						<use xlinkHref="#icon-dots-2"/>
					</svg>}
											 sendFunc={() => onSelect(task)}/>
				</ControlBox>
			</form>
		</div>
	)
}

