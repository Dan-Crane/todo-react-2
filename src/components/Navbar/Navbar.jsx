import React, {useState, useContext} from "react";

import './Navbar.scss'

import {List} from "./List/List";
import AddList from "./AddList/AddList";
import {Preloader} from "../Preloader/Preloader";

import {useApi} from "../../hooks/api";

export const Navbar = ({
												 activeLocation, colors,
												 addList, onRemoveList, onActiveList,
												 activeList, onAllActiveList
											 }) => {

	const {data: {lists}} = useApi()

	const [visible, setVisible] = useState(false)

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

			<List lists={lists} visible={visible}/>

		</nav>
	)
}
