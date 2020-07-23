import React, {useState, useEffect} from 'react';
import axios from 'axios'

import './AddList.scss'

import closeSvg from '../../../assets/icons/closeSVG.svg'

import {List} from "../List/Navbar";
import {Badge} from "../../Badge/Badge";
import {api} from "../../../api/api";

const AddList = ({colors, addList}) => {
	const [visible, setVisible] = useState(false)
	const [selectColor, selectedColor] = useState(null)
	const [input, setInput] = useState('')

	useEffect(() => {
		if (Array.isArray(colors)) {
			selectedColor(colors[0].id)
		}
	}, [colors])

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
		debugger
		e.preventDefault()
		if (!input) {
			alert('Введите название списка')
			return
		}

		axios
			.post('http://localhost:3001/lists', {
				name: input,
				colorId: selectColor
			})
			.then(({ data }) => {
				console.log(data)
			})

		// const newTask = createList()
		// api.addList(newTask).then(res => console.log(res))
		// addList(newTask)
		// onClose()
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
			{visible && <div className='add-list-btn__popup'>

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
				<button onClick={onAddList}
								className='main-btn add-list-btn__btn'>Добавить
				</button>
			</div>}
		</div>
	);
};

export default AddList;
