import React, {useState} from "react";

import './Navbar.scss'

import {List} from "./List/List";
import AddList from "./AddList/AddList";

import {useStore} from "../../hooks/store";

export const Navbar = ({
												 activeLocation, colors,
												 addList, onRemoveList, onActiveList,
												 activeList, onAllActiveList
											 }) => {

	const [visible, setVisible] = useState(false)
	const {state, actions} = useStore()


	let navbarStyle = 'navbar'
	if (visible) navbarStyle += ' show'

	return (
		<nav className={navbarStyle}>
			<abbr className={`navbar__tog-show `}
						data-icon="o"
						onClick={() => setVisible((v) => !v)}/>

			<div className='navbar__auth auth-nav'>
				<h3 className={`auth-nav__title ${visible ? '' : 'hidden'}`}>React ToDo</h3>
				<div className='auth-nav__wrap'>
					<span className={`auth-nav__email ${visible ? '' : 'hidden'}`}>{state.user.email}</span>
					<abbr data-icon="q"
								onClick={() => actions.logOutUser()}
								className={`auth-nav__logout ${visible ? '' : 'hidden'}`}/>
				</div>
			</div>

			<List lists={
				[{
					icon: <abbr data-icon="n"/>,
					name: 'Задачи',
					to: '/'
				}, {
					icon: <abbr data-icon="z"/>,
					name: 'Важные',
					to: '/important'
				}, {
					icon: <abbr data-icon="j"/>,
					name: 'Запланированные',
					to: '/planned'
				}]
			} visible={visible}/>

			<List lists={state.lists} visible={visible}/>

			<AddList/>

		</nav>
	)
}
