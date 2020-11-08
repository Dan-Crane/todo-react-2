import React, {useEffect, useRef, useState} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {useOutsideAlerter} from "../../hooks/OutsideAlerter";

import {useStore} from "../../hooks/store";
import {useOnClickOutside} from "../../hooks/OnClickOutside";
import {useWindowSize} from "../../hooks/windowSize";

import './Navbar.scss'

import {List} from "./List/List";
import {AddList} from "./AddList/AddList";
import {Test} from "../App/test";


export const Navbar = () => {
	const [burger, setBurger] = useState(false)
	const [width] = useWindowSize()
	const {state, actions} = useStore()

	// const ref = useRef();
	// // State for our modal
	// const [isModalOpen, setModalOpen] = useState(false);
	// // Call hook passing in the ref and a function to call on outside click
	// useOnClickOutside(ref, () => setModalOpen(false));

	const {visible, setVisible, ref} = useOutsideAlerter(false)

	useEffect(() => {
		if (width > 768) setVisible(false)
	}, [width])

	const handleDelete = (listId) => {
		actions.deleteList(listId)
	}

	return (
		<nav className={`navbar ${visible && 'show'}`}  >
			<SwitchTransition mode='out-in'>
				<CSSTransition key={visible}
											 in={visible}
											 timeout={300}
											 classNames={'burger-show'}>
					<div className={`navbar__tog-show ${visible && 'show'}`}>
						{
							visible ?
								<svg className={`icon-chevron-left ${visible && 'show'}`}
										 onClick={()=> setVisible(v => !v)}>
									<use xlinkHref="#icon-chevron-left"/>
								</svg>
								:
								<svg className="icon-chevron-right "
										 onClick={()=> setVisible(v => !v)}>
									<use xlinkHref="#icon-chevron-right"/>
								</svg>
						}
					</div>
				</CSSTransition>
			</SwitchTransition>

			<div className={`navbar__auth auth-nav ${width > 768 ? 'show' : visible && 'show'}`}>
				<h3 className='auth-nav__title'>React ToDo</h3>
				<div className='auth-nav__wrap'>
					<span className='auth-nav__email'>{state.user.email}</span>
					<abbr data-icon="q"
								onClick={() => actions.logOutUser()}
								className={`auth-nav__logout ${width > 768 ? 'show' : visible && 'show'}`}/>
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
						burgerShow={visible}/>

			<List lists={state.lists}
						burgerShow={visible}
						onDelete={handleDelete}
						isRemovable/>
			<AddList burgerShow={visible}/>

		</nav>
	)
}
