import React, {useState} from "react";

import {useWindowSize} from "../../hooks/windowSize";

import './Navbar.scss'

import {List} from "./List/List";
import AddList from "./AddList/AddList";

import {useStore} from "../../hooks/store";

export const Navbar = ({
												 activeLocation, colors,
												 addList, onRemoveList, onActiveList,
												 activeList, onAllActiveList
											 }) => {

	const [mobileScreen, setMobileScreen] = useState(false)
	const [width] = useWindowSize()
	const {state, actions} = useStore()

	// const [visible, setVisible] = useState(false)
	// mobileScreen setMobileScreen

	// let navbarStyle = 'navbar'
	// if (visible) navbarStyle += ' show'

	const handleDelete = (listId) => {
		actions.deleteList(listId)
	}

	return (
		<nav className={`navbar ${mobileScreen && 'show'}`}>
			<abbr className={`navbar__tog-show `}
						data-icon="o"
						onClick={() => setMobileScreen((v) => !v)}/>

			<div className={`navbar__auth auth-nav ${width > 768 ? 'show' : mobileScreen && 'show'}`}>
				<h3 className='auth-nav__title'>React ToDo</h3>
				<div className='auth-nav__wrap'>
					<span className='auth-nav__email'>{state.user.email}</span>
					<abbr data-icon="q"
								onClick={() => actions.logOutUser()}
								className={`auth-nav__logout ${width > 768 ? 'show' : mobileScreen && 'show'}`}/>
				</div>
			</div>

			<List lists={
				[{
					icon: <abbr data-icon="n"/>,
					name: 'Задачи',
					to: '/',
				}, {
					icon: <abbr data-icon="z"/>,
					name: 'Важные',
					to: '/important'
				}, {
					icon: <abbr data-icon="j"/>,
					name: 'Запланированные',
					to: '/planned'
				}]
			}
						visible={mobileScreen}/>

			<List lists={state.lists}
						visible={mobileScreen}
						onDelete={handleDelete}
						isRemovable/>

			<AddList visible={mobileScreen}/>

		</nav>
	)
}
