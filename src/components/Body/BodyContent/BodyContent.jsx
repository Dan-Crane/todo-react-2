import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import './BodyContent.scss'

import {AddTaskItem} from "./AddTaskItem/AddTaskItem";
import {TaskItem} from "./TaskItem/TaskItem";

export const BodyContent = ({tasks, onSubmit, onDelete, onUpdate, onSelect}) => {
	return (
		<div className='body__item-tasks body-content'>
			{
				<TransitionGroup>
					{tasks.map(t => (
						<CSSTransition
							key={t.id}
							timeout={300}
							classNames='item'>
							<TaskItem
								task={t}
								onSelect={onSelect}
								onUpdate={onUpdate}
								onDelete={onDelete}/>
						</CSSTransition>
					))}
				</TransitionGroup>
			}

			{/*{tasks.map(t => {*/}
			{/*	return (<TaskItem*/}
			{/*		task={t}*/}
			{/*		key={t.id}*/}
			{/*		onSelect={onSelect}*/}
			{/*		onUpdate={onUpdate}*/}
			{/*		onDelete={onDelete}/>)*/}
			{/*})}*/}
			<AddTaskItem onSubmit={onSubmit}/>
		</div>
	)
}
