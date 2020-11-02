import React, {useEffect, useState} from "react";

import {useWindowSize} from "../../hooks/windowSize";

import './Navbar.scss'

import {List} from "./List/List";
import {AddList} from "./AddList/AddList";

import {useStore} from "../../hooks/store";
import {CSSTransition, SwitchTransition} from "react-transition-group";

export const Navbar = () => {
	const [burger, setBurger] = useState(false)
	const [width] = useWindowSize()
	const {state, actions} = useStore()

	useEffect(() => {
		if (width > 768) setBurger(false)
	}, [width])

	const handleDelete = (listId) => {
		actions.deleteList(listId)
	}

	return (
		<nav className={`navbar ${burger && 'show'}`}>
			<SwitchTransition mode='out-in'>
				<CSSTransition key={burger}
											 in={burger}
											 timeout={300}
											 classNames={'burger-show'}>
					<div className={`navbar__tog-show ${burger && 'show'}`}>
						{
							burger ?
								<svg className={`icon-chevron-left ${burger && 'show'}`}
										 onClick={() => setBurger((v) => !v)}>
									<use xlinkHref="#icon-chevron-left"/>
								</svg>
								:
								<svg className="icon-chevron-right "
										 onClick={() => setBurger((v) => !v)}>
									<use xlinkHref="#icon-chevron-right"/>
								</svg>
						}
					</div>
				</CSSTransition>
			</SwitchTransition>
			{/*<abbr className={`navbar__tog-show `}*/}
			{/*			data-icon="o"*/}
			{/*			onClick={() => setBurger((v) => !v)}/>*/}

			<div className={`navbar__auth auth-nav ${width > 768 ? 'show' : burger && 'show'}`}>
				<h3 className='auth-nav__title'>React ToDo</h3>
				<div className='auth-nav__wrap'>
					<span className='auth-nav__email'>{state.user.email}</span>
					<abbr data-icon="q"
								onClick={() => actions.logOutUser()}
								className={`auth-nav__logout ${width > 768 ? 'show' : burger && 'show'}`}/>
				</div>
			</div>

			<List lists={
				[{
					icon: <svg className="icon-list-1">
						<use xlinkHref="#icon-list-1"/>
					</svg>,
					name: 'Задачи',
					to: '/',
				}, {
					icon: <svg className="icon-star-4">
						<use xlinkHref="#icon-star-4"/>
					</svg>,
					name: 'Важные',
					to: '/important'
				}, {
					icon: <svg className="icon-calendar">
						<use xlinkHref="#icon-calendar"/>
					</svg>,
					name: 'Запланированные',
					to: '/planned'
				}]
			}
						burgerShow={burger}/>

			<List lists={state.lists}
						burgerShow={burger}
						onDelete={handleDelete}
						isRemovable/>
			<AddList burgerShow={burger}/>

		</nav>
	)
}
