import React, {useEffect, useState} from 'react';

import DB from '../../assets/db.json'

import './App.scss'

import {Navbar} from "../Navbar/Navbar";
import {Body} from "../Body/Body";
import {api} from "../../api/api";

const App = () => {

	const [lists, setLists] = useState(null)
	const [colors, setColors] = useState(null)

	// DB.lists.map(i => {
	// 	const colorItem = DB.colors.filter(colorName => {
	// 		return i.colorId === colorName.id
	// 	})[0].name
	// 	return {...i, color: colorItem}
	// })

	useEffect(() => {
		api.getLists()
			.then(res => setLists(res))
		api.getColors()
			.then(res=> setColors(res))
	}, [])


	window.lists = lists

	const addList = (body) => {
		const newlist = [...lists, body]
		setLists(newlist)
	}

	const onRemoveList = (item) => {
		const idx = lists.findIndex(i => i === item)
		const newList = [...lists.slice(0, idx), ...lists.slice(idx + 1)]
		setLists(newList)
	}

	return (
		<div className="todo">
			<Navbar lists={lists}
							addList={addList}
							onRemoveList={onRemoveList}
							colors={colors}/>
			<Body/>
		</div>
	);
}

export default App;
