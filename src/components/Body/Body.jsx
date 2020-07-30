import React from "react";

import './Body.scss'

import {TitleBody} from "./TitileBody/TitileBody";
import {ItemBody} from "./ItemBody/ItemBody";

export const Body = ({lists, onEditTitle, onAddTask, withoutEmpty, colorTitle, onRemoveTask}) => {

	return (
		<section className='body'>
			<TitleBody title={lists.name}
								 colorTitle={colorTitle}
								 id={lists.id}
								 onEditTitle={onEditTitle}/>
			<ItemBody idList={lists.id}
								onAddTask={onAddTask}
								tasks={lists.tasks}
								withoutEmpty={withoutEmpty}
								onRemoveTask={onRemoveTask}/>
		</section>
	)
}
