import React, {useState, useEffect} from 'react';

import './AddList.scss'

import closeSvg from '../../../assets/icons/closeSVG.svg'

import {List} from "../List/List";
import {Badge} from "../../Badge/Badge";
import {api} from "../../../api/api";

const AddList = ({colors, addList}) => {
	const [visible, setVisible] = useState(false)
	const [selectColor, selectedColor] = useState(null)
	const [input, setInput] = useState('')
	const [disableBtn, setDisableBtn] = useState(false)

	useEffect(() => {
		if (Array.isArray(colors)) {
			selectedColor(colors[0].id)
		}
	}, [])


	const onInputChange = (e) => {
		setInput(e.target.value)
	}

	const createList = () => {
		return {
			color: colors.filter(i => i.id === selectColor)[0].name,
			colorId: selectColor,
			name: input,
		}
	}


	const onAddList = (e) => {
		e.preventDefault()
		if (!input) {
			return alert('Введите название списка')
		}
		setDisableBtn(true)
		const newTask = createList()
		api.addList(newTask)
			.then(res => {
				const color = colors.find(c => c.id === selectColor).name
				const listObj = {...res, color: {name: color, hex: color}}
				addList(listObj)
				onClose()
			})
			.finally(() => {
				setDisableBtn(false)
			})
	}

	const onClose = () => {
		setVisible(false)
		setInput('')
		selectedColor(colors[0].id)
	}

	return (
		<div className='add-list-btn'>
			<List items={[
				{
					className: 'add-btn',
					icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
					,
					name: 'Добавить список',
				},]}
						onClick={() => {
							setVisible(true)
						}}/>
			{visible && <form onSubmit={onAddList}
												className='add-list-btn__popup'>

				<img src={closeSvg}
						 alt="close"
						 className='add-list-btn__close'
						 onClick={onClose}/>
				<input className='main-input add-list-btn__input'
							 placeholder='Название листа'
							 autoFocus={true}
							 onChange={onInputChange}
							 value={input}/>
				<div className='add-list-btn__color-block'>
					{colors.map(i => {
						return <Badge key={i.id}
													color={i.name}
													onClick={() => selectedColor(i.id)}
													className={selectColor === i.id && 'active'}/>
					})}
				</div>
				<button type='submit'
								disabled={disableBtn}
								style={disableBtn ? {backgroundColor: 'green'} : {backgroundColor: ''}}
								className='main-btn add-list-btn__btn'>{disableBtn ? 'Добавление...' : 'Добавить'}
				</button>
			</form>}
		</div>
	);
};

export default AddList;
