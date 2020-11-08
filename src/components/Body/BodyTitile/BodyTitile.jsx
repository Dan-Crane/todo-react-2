import React, {useState} from "react";

import {CSSTransition, SwitchTransition} from "react-transition-group";
import {useLocation} from 'react-router-dom';

import './BodyTitile.scss'

import {Input} from "../../InputComponent/Input";
import {ControlBox, ControlItem} from "../../ControlBox/ControlBox";
import {DropdownItem, DropdownMenu} from "../../DropdownMenu/DropdownMenu";

export const TitleBody = ({list, onUpdate, onSortChange}) => {
	const [editMode, setEditMode] = useState(false)
	const [inputValue, setInputValue] = useState(list.name)
	const location = useLocation()

	const handleChange = (e) => {
		e.preventDefault()
		onUpdate('list', list.id, {name: inputValue})
		setEditMode(!editMode)
	}

	function handleInput(e) {
		setInputValue(e.target.value)
	}

	return (
		<div className='body__title title-wrap'>
			<SwitchTransition mode='out-in'>
				<CSSTransition
					key={editMode}
					in={editMode}
					timeout={300}
					classNames={'fade-text'}>
					{editMode ?
						<form onSubmit={handleChange}>
							<Input
								placeholder={'Название списка'}
								text={list.name} type='text'
								value={inputValue}
								setValue={handleInput}
								autoFocus/>
						</form>
						:
						<h2
							style={{color: list.color ? list.color.hex : 'black'}}
							className='title-wrap__title'>
							{list.name}
						</h2>}
				</CSSTransition>
			</SwitchTransition>

			<SwitchTransition>
				<CSSTransition
					key={editMode}
					in={editMode}
					timeout={300}
					classNames={'fade-btn'}>
					{editMode
						? <ControlBox>
							<ControlItem icon={<svg className="icon-check">
								<use xlinkHref="#icon-check"/>
							</svg>}
													 color={'#04DD5C'}
													 sendFunc={() => {
														 onUpdate('list', list.id, {name: inputValue})
														 setEditMode(!editMode)
													 }}/>

							<ControlItem icon={<svg className="icon-times">
								<use xlinkHref="#icon-times"/>
							</svg>}
													 color={'#EE0463'}
													 sendFunc={() => {
														 setEditMode(!editMode)
														 setInputValue(list.name)
													 }}/>
						</ControlBox>

						: <ControlBox>
							{!list.hardCode && <ControlItem icon={<svg className="icon-pencil">
								<use xlinkHref="#icon-pencil"/>
							</svg>}
																							sendFunc={() => setEditMode(!editMode)}/>}

							<ControlItem icon={<svg className="icon-sort">
								<use xlinkHref="#icon-sort"/>
							</svg>}>
								<DropdownMenu>
									<DropdownItem sendFunc={() => onSortChange('title')}>
										По алфавиту
									</DropdownItem>
									<DropdownItem sendFunc={() => onSortChange('date')}>
										По дате
									</DropdownItem>
									{
										location.pathname !== '/important' &&
										<DropdownItem sendFunc={() => onSortChange('important')}>
											По важности
										</DropdownItem>
									}
									<DropdownItem sendFunc={() => onSortChange('completed')}>
										По завершенным
									</DropdownItem>

								</DropdownMenu>
							</ControlItem>
						</ControlBox>
					}
				</CSSTransition>
			</SwitchTransition>


		</div>
	)
}
