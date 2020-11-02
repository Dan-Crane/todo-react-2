import React from "react";
import classNames from 'classnames'
import {CSSTransition, TransitionGroup} from "react-transition-group";

import './List.scss'

import {Badge} from "../../Badge/Badge";
import {NavLink} from "react-router-dom";

export const List = (props) => {
	const {
		lists, isRemovable,
		//new props
		burgerShow, onDelete
	} = props

	return (
		<ul className='navbar__list list-navbar'>
			<TransitionGroup component={null}>
				{lists && lists.map((i, index) => (
						<CSSTransition
							key={index}
							classNames={{
								enterActive: 'list-navbar__link-add',
								exitActive: 'list-navbar__link-del',
							}}
							timeout={400}
							mountOnEnter
							unmountOnExit>
							<li className='list-navbar__item'>
								<NavLink to={i.added ? 'null' : i.to || `/list/${i.id}`}
												 className='list-navbar__link'
									// active при выбранной вкладке
												 isActive={(match) => {
													 if (!match) {
														 return false;
													 } else if (match.url === '') return false
													 else if (match.url === i.to || `/list/${i.id}`) {
														 return true;
													 }
												 }}>
									<i className={`list-navbar__icon ${burgerShow && 'show'}`}
										 style={i.icon ? {opacity: .6} : {}}>
										{i.icon ? i.icon : <Badge color={i.color.name}/>}
									</i>
									<span className={`list-navbar__text ${burgerShow && 'show'}`}>{i.name}</span>

									{isRemovable &&
									<svg className={`icon-times list-navbar__btn-remove ${burgerShow && 'show'}`}
											 onClick={(e) => {
												 e.preventDefault()
												 e.stopPropagation()
												 onDelete(i.id)
											 }}>
										<use xlinkHref="#icon-times"/>
									</svg>}
								</NavLink>
							</li>
						</CSSTransition>

					)
				)}
			</TransitionGroup>
		</ul>
	)
}

