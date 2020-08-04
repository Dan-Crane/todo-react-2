import React from "react";
import classNames from 'classnames'

import './List.scss'

import removableIcon from '../../../assets/icons/removeIcon.svg'

import {Badge} from "../../Badge/Badge";
import {api} from "../../../api/api";

export const List = ({items, isRemovable, onRemoveList,
											 onActiveList, activeList, onClick,
											 visible}) => {

	const onRemove = (item) => {
		if (window.confirm('Вы действительно хотите удалить список?')) {
			api.deleteList(item.id)
				.then(res => onRemoveList(item))
		}
	}

	let toggleVisible = ''
	if(visible) toggleVisible += ' active-visible'


	return (
		<ul className='navbar__list list-navbar'
				onClick={onClick}>
			{items.map((i, index) => {
				return (
					<li key={index}
							className={classNames(i.className, {active: i.active ? i.active : activeList && activeList.id === i.id}, toggleVisible)}
							onClick={onActiveList ? () => onActiveList(i) : null}
					>
						<i className={toggleVisible}>
							{i.icon ? i.icon : <Badge color={i.color.name}/>}
						</i>
						<span className={toggleVisible}>{i.name}</span>

						<div className={`list-navbar__count ${toggleVisible}`}>
							{i.tasks && `(${i.tasks.length})`}
						</div>
						{isRemovable && <img src={removableIcon}
																 className={`list-navbar__btn-remove ${toggleVisible}`}
																 onClick={() => onRemove(i)}
																 alt="remove"/>}
					</li>
				)
			})}
		</ul>
	)
}

