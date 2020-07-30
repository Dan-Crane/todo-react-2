import React from "react";

import './TitileBody.scss'

import changeSvg from '../../../assets/icons/changeSvg.svg'
import {api} from "../../../api/api";

export const TitleBody = ({title, id, onEditTitle, colorTitle}) => {

	const editTitle = () => {
		const newTitle = window.prompt('Введите название заголовка', title)
		if (newTitle) {
			api.changeTitle(id, newTitle)
				.then(res=> onEditTitle(newTitle, id))
				.catch(()=> alert('Не удалось обновить название списка'))
		}
	}

	return (
		<div className='body__title title-wrap'>
			<h2 style={{color: colorTitle}} className='title-wrap__title'>
				{title}
			</h2>
			<img className='title-wrap__icon'
					 src={changeSvg}
					 alt="change list"
					 onClick={editTitle}/>
		</div>

	)
}
