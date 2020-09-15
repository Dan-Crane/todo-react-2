import React from "react";
import classNames from 'classnames'

import './List.scss'

import {Badge} from "../../Badge/Badge";
import {NavLink} from "react-router-dom";

export const List = ({
											 lists, isRemovable,
											 onActiveList, activeList, onClick,
											 visible,

	//new props
	onDelete
										 }) => {


	let toggleVisible = ''
	if (visible) toggleVisible += ' active-visible'

	return (
		<ul className='navbar__list list-navbar'
				onClick={onClick}>
			{lists && lists.map((i, index) => {
				return (
					<NavLink key={index}
									 to={i.added ? 'null' : i.to || `/list/${i.id}`}>

						<li
							className={classNames(i.className, {active: i.active
									? i.active
									: activeList && activeList.id === i.id}, toggleVisible)}
							onClick={onActiveList ? () => onActiveList(i) : null}
						>
							<i className={toggleVisible}>
								{i.icon ? i.icon : <Badge color={i.color.name}/>}
							</i>
							<span className={toggleVisible}>{i.name}</span>

							{/*<div className={`list-navbar__count ${toggleVisible}`}>*/}
							{/*	{i.tasks && `(${i.tasks.length})`}*/}
							{/*</div>*/}
							{isRemovable && <abbr data-icon="i"
																		className={`list-navbar__btn-remove ${toggleVisible}`}
																		onClick={() => onDelete(i.id)}/>}
						</li>
					</NavLink>
				)
			})}
		</ul>
	)
}

