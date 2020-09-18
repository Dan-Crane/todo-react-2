import React from "react";
import classNames from 'classnames'
import {CSSTransition, TransitionGroup} from "react-transition-group";

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
		<ul className='navbar__list list-navbar'>
			<TransitionGroup>
				{lists && lists.map((i, index) => {
					return (
						<CSSTransition
							key={index}
							classNames={{
								enterActive: 'list-navbar__wrap-add',
								exitActive: 'list-navbar__wrap-del',
							}}
							timeout={400}
							mountOnEnter
							unmountOnExit>
							<NavLink to={i.added ? 'null' : i.to || `/list/${i.id}`} className='list-navbar__wrap'>

								<li
									className={classNames({
										active: i.active
											? i.active
											: activeList && activeList.id === i.id
									})}>
									<i className={toggleVisible}>
										{i.icon ? i.icon : <Badge color={i.color.name}/>}
									</i>
									<span className={toggleVisible}>{i.name}</span>

									{/*<div className={`list-navbar__count ${toggleVisible}`}>*/}
									{/*	{i.tasks && `(${i.tasks.length})`}*/}
									{/*</div>*/}
									{isRemovable && <abbr data-icon="i"
																				className={`list-navbar__btn-remove`}
																				onClick={() => onDelete(i.id)}/>}
								</li>
							</NavLink>
						</CSSTransition>

					)
				})}
			</TransitionGroup>
		</ul>
	)
}

