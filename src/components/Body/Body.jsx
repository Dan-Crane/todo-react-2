import React, {useContext, useEffect, useState} from "react";

import './Body.scss'

import {TitleBody} from "./BodyTitile/BodyTitile";
import {BodyContent} from "./BodyContent/BodyContent";

export const Body = ({match}) => {

	return (
		<section className='body'>
			<TitleBody
				// title={lists.name}
				// 				 colorTitle={colorTitle}
				// 				 id={lists.id}
				// 				 onEditTitle={onEditTitle}
			/>
			<BodyContent match={match}
				// 	idList={lists.id}
				// 					lists={lists}
				// 					onAddTask={onAddTask}
				// 					tasks={lists.tasks}
				// 					withoutEmpty={withoutEmpty}
				// 					onRemoveTask={onRemoveTask}
				// 					onEditTask={onEditTask}
				// 					onChangeChecked={onChangeChecked}
				// 					sendState={sendState}
			/>
		</section>
	)
}
