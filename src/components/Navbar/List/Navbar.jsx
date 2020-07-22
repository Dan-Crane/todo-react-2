import React from "react";
import classNames from 'classnames'

import './Navbar.scss'

import removableIcon from '../../../assets/icons/removeIcon.svg'

import {Badge} from "../../Badge/Badge";

export const List = ({items, onClick, isRemovable, onRemoveList }) => {

	const onRemove =(item) =>{
		if(window.confirm('Вы действительно хотите удалить список?'))
		onRemoveList(item)
	}

	return (
		<ul className='navbar__list list-navbar'>
			{items.map((i, index) => {
				return (
					<li key={index}
							className={classNames(i.className, {active: i.active})}
							onClick={onClick}>
						<i>
							{i.icon ? i.icon : <Badge color={i.color}/>}
						</i>
						<span>{i.name}</span>
						{isRemovable && <img src={removableIcon}
																 className='list-navbar__btn-remove'
																 onClick={()=> onRemove(i)}
																 alt="remove"/>}
					</li>
				)
			})}
		</ul>
	)
}

