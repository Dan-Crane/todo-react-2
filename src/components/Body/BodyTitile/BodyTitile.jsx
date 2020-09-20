import React, {useState} from "react";

import './BodyTitile.scss'
import {CSSTransition, SwitchTransition} from "react-transition-group";

import {Input} from "../../InputComponent/Input";

export const TitleBody = ({list, onUpdate}) => {
	const [editMode, setEditMode] = useState(true)

	return (
		<div className='body__title title-wrap'>

			{/*<CSSTransition*/}
			{/*	in={editMode}*/}
			{/*	timeout={3000}*/}
			{/*	classNames={{*/}
			{/*		enterActive: 'title-wrap__edit-title--show',*/}
			{/*		exitActive: 'title-wrap__edit-title--hide'*/}
			{/*	}}*/}
			{/*	mountOnEnter*/}
			{/*	unmountOnExit>*/}
			{/*	<div className='title-wrap__edit-title'>*/}
			{/*		hi*/}
			{/*	</div>*/}
			{/*</CSSTransition>*/}

			<SwitchTransition mode='out-in'>
				<CSSTransition
					key={editMode}
					in={editMode}
					timeout={300}
					classNames={'fade-text'}>
					{editMode ?
						<Input placeholder={'Название списка'} text={list.name} type='text'/>
						:
						<h2 style={{color: list.color ? list.color.hex : 'black'}} className='title-wrap__title'>
							{list.name}
						</h2>}
				</CSSTransition>
			</SwitchTransition>

			<SwitchTransition >
				<CSSTransition
					key={editMode}
					in={editMode}
					timeout={300}
					classNames={'fade-btn'}>
					{editMode ? <div
							className='title-wrap__img-box'>
							<abbr
								onClick={() => setEditMode(!editMode)}
								data-icon="d"
								className='title-wrap__ok'/>
							<abbr
								onClick={() => setEditMode(!editMode)}
								data-icon="i"
								className='title-wrap__cancel'/>
						</div>
						: <div
							className='title-wrap__img-box'>
							<abbr
								onClick={() => setEditMode(!editMode)}
								data-icon="c"
								className='title-wrap__edit'/>
							<abbr
								data-icon="b"
								className='title-wrap__sort'/>
						</div>
					}

				</CSSTransition>
			</SwitchTransition>

		</div>

	)
}
