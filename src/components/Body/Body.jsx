import React from "react";

import './Body.scss'

import {TitleBody} from "./TitileBody/TitileBody";
import {ItemBody} from "./ItemBody/ItemBody";

export const Body = ({ lists }) => {
	return (
		<section className='body'>
			<TitleBody title={lists.name}/>
			<ItemBody tasks={lists.tasks}/>
		</section>
	)
}
