import React, {useState, useContext, useLayoutEffect} from "react";

import './Navbar.scss'

import {DBContext} from "../../context/db";

import {List} from "./List/List";
import AddList from "./AddList/AddList";
import {Preloader} from "../Preloader/Preloader";

export const Navbar = ({
												 activeLocation, colors, lists,
												 addList, onRemoveList, onActiveList,
												 activeList, onAllActiveList
											 }) => {

	const [visible, setVisible] = useState(false)
	const DB = useContext(DBContext)

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
				},{
					icon: <abbr data-icon="m"></abbr>,
					name: 'Важные',
					to: '/important'
				},{
					icon: <abbr data-icon="j"></abbr>,
					name: 'Запланированные',
					to: '/planned'
				}]
			} visible={visible}/>

			<List lists={DB.listsTest} visible={visible}/>

		</nav>
	)
}
