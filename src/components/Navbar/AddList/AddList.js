import React, {useEffect, useState} from 'react';

import {useStore} from "../../../hooks/store";
import {CSSTransition} from "react-transition-group";

import './AddList.scss'
import {Badge} from "../../Badge/Badge";

export const AddList = ({
													colors, addList, addVisible,

													burgerShow
												}) => {
	const {state, actions} = useStore()
	const [displayPopup, setDisplayPopup] = useState(false)
	const [selectColor, selectedColor] = useState(null)
	const [input, setInput] = useState('')
	const [disableBtn, setDisableBtn] = useState(false)

	useEffect(() => {
		selectedColor(state.colors[0])
	}, [state.colors])

	const onInputChange = (e) => {
		setInput(e.target.value)
	}

	const createList = () => {
		return {
			color: selectColor,
			colorId: state.colors.find(i => i.id === selectColor.id).id,
			name: input,
			userId: state.user.uid
		}
	}

	const handleAddList = (e) => {
		e.preventDefault()
		if (!input) {
			return alert('Введите название списка')
		}
		setDisableBtn(true)
		actions.createList(createList())
		setDisableBtn(false)
		onClose()
	}

	const onClose = () => {
		setDisplayPopup(false)
		setInput('')
		selectedColor(state.colors[0])
	}

	return (
		<div className='add-list-btn'>

			<div className='navbar__list list-navbar add-list-btn__wrap'
					 onClick={() => setDisplayPopup(s => !s)}>
				<svg className={`icon-plus-1 add-list-btn__icon ${burgerShow && 'show'}`}>
					<use xlinkHref="#icon-plus-1"/>
				</svg>
				<span className={`add-list-btn__text ${burgerShow && 'show'}`}>Добавить список</span>
			</div>

			<CSSTransition
				in={displayPopup}
				timeout={150}
				classNames={{
					enter: 'add-list-btn__popup-show',
					exitActive: 'add-list-btn__popup-hide',
				}}
				mountOnEnter
				unmountOnExit>

				<form onSubmit={handleAddList}
							className={`add-list-btn__popup`}>
					<svg className="icon-closesvg add-list-btn__close"
							 onClick={onClose}>
						<use xlinkHref="#icon-closesvg"/>
					</svg>
					<input className='main-input add-list-btn__input'
								 placeholder='Название листа'
								 autoFocus={true}
								 onChange={onInputChange}
								 value={input}/>
					<div className='add-list-btn__color-block'>
						{state.colors.map(i => {
							return <Badge key={i.id}
														color={i.name}
														onClick={() => selectedColor(i)}
														className={selectColor === i && 'active'}/>
						})}
					</div>
					<button type='submit'
									disabled={disableBtn}
									style={disableBtn ? {backgroundColor: 'green'} : {backgroundColor: ''}}
									className='main-btn add-list-btn__btn'>{disableBtn ? 'Добавление...' : 'Добавить'}
					</button>
				</form>
			</CSSTransition>
		</div>
	);
};
