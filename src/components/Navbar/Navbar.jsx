import React, {useState, useEffect} from "react";

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


	useEffect(() => {
		actions.getLists()
	}, [actions])

	let navbarStyle = 'navbar'
	if (visible) navbarStyle += ' show'

	return (
		<nav className={navbarStyle}>
			<div className={`navbar__tog-show `}
					 data-icon="a"
					 onClick={() => setVisible((v) => !v)}>
			</div>

			<List lists={
				[{
					icon: <abbr data-icon="f"></abbr>,
					name: 'Все задачи',
					to: '/'
				}, {
					icon: <abbr data-icon="m"></abbr>,
					name: 'Важные',
					to: '/important'
				}, {
					icon: <abbr data-icon="j"></abbr>,
					name: 'Запланированные',
					to: '/planned'
				}]
			} visible={visible}/>

			<List lists={state.lists} visible={visible}/>

			<AddList/>

		</nav>
	)
}
