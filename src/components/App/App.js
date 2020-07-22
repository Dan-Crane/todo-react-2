import React, {useState} from 'react';

import DB from '../../assets/db.json'

import './App.scss'

import {Navbar} from "../Navbar/Navbar";
import {Body} from "../Body/Body";

const App = () => {

	const [lists, setLists] = useState(DB.lists.map(i => {
		const colorItem = DB.colors.filter(colorName => {
			return i.colorId === colorName.id
		})[0].name
		return {...i, color: colorItem}
	}))

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
							colors={DB.colors}/>
			<Body/>
		</div>
	);
}

export default App;
