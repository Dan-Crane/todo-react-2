import React, {useContext} from "react";

import './BodyTitile.scss'

import {DBContext} from "../../../context/db";

import {api} from "../../../api/api";
import {NavLink, useRouteMatch} from "react-router-dom";
import {PreloaderCircle} from "../../PreloaderCircle/PreloaderCrcle";

export const TitleBody = ({title, id, onEditTitle, colorTitle}) => {
	const db = useContext(DBContext)
	let match = useRouteMatch('/list/:listId?');

	const list = db.listsTest.find(i=>i.id === match.params.listId)

	const editTitle = () => {
		const newTitle = window.prompt('Введите название заголовка', title)
		if (newTitle) {
			api.changeTitle(id, newTitle)
				.then(res => onEditTitle(newTitle, id))
				.catch(() => alert('Не удалось обновить название списка'))
		}
	}

if (!list) return <PreloaderCircle/>

	return (
		<div className='body__title title-wrap'>
			<NavLink to={`/list/${list.id}`}>
				<h2 style={{color: colorTitle}} className='title-wrap__title'>
					{list.name}
				</h2>
			</NavLink>
			<abbr data-icon="c" className='title-wrap__icon'></abbr>
			{/*<img className='title-wrap__icon'*/}
			{/*		 src={changeSvg}*/}
			{/*		 alt="change list"*/}
			{/*		 onClick={editTitle}/>*/}
		</div>

	)
}
