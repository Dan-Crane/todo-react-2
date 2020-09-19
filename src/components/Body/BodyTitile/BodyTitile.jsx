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
					classNames={'fade'}>
					{editMode
						?
						<div>
							<Input placeholder={'Название списка'} text={list.name} type='text'
										 // onBlur={() => setEditMode(!editMode)}
							/>

						</div>
						:
						<>
							<h2 style={{color: list.color ? list.color.hex : 'black'}} className='title-wrap__title'>
								{list.name}
							</h2>
							<div className='title-wrap__img-box'>

								<abbr onClick={() => setEditMode(!editMode)}
											data-icon="c"
											className='title-wrap__edit'/>
								<abbr data-icon="a" className='title-wrap__sort'/>

							</div>
						</>
					}

				</CSSTransition>
			</SwitchTransition>


		</div>

	)
}
