import React, {useState} from 'react';

import {useStore} from "../../../hooks/store";

import './AddList.scss'

import {List} from "../List/List";
import {Badge} from "../../Badge/Badge";
import {api} from "../../../api/api";

const AddList = ({colors, addList, addVisible}) => {
	const {state, actions} = useStore()


	const [visible, setVisible] = useState(false)
	const [selectColor, selectedColor] = useState(null)
	const [input, setInput] = useState('')
	const [disableBtn, setDisableBtn] = useState(false)

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
				const color = colors.find(c => c.id === selectColor)
				const listObj = {...res, color, tasks: []}
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
		// selectedColor(colors[0].id)
	}

	return (
		<div className='add-list-btn'>
			<List lists={[
				{
					className: 'add-btn',
					icon: <abbr data-icon="e"/>
					,
					name: 'Добавить список',
					added: true
				},]}
						visible={addVisible}
						onClick={() => {
							setVisible(true)
						}}/>
			{visible && <form onSubmit={onAddList}
												className='add-list-btn__popup'>

				<abbr data-icon="g"
							className='add-list-btn__close'
							onClick={onClose}/>
				<input className='main-input add-list-btn__input'
							 placeholder='Название листа'
							 autoFocus={true}
							 onChange={onInputChange}
							 value={input}/>
				<div className='add-list-btn__color-block'>
					{state.colors.map(i => {
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
