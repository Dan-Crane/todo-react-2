import React, {useContext} from "react";

import './BodyTitile.scss'
import {NavLink} from "react-router-dom";

export const TitleBody = ({list, colorTitle}) => {

	return (
		<div className='body__title title-wrap'>
			<NavLink to={`/list/${list.id}`}>
				<h2 style={{color: colorTitle}} className='title-wrap__title'>
					{list.name}
				</h2>
			</NavLink>
			<abbr data-icon="c" className='title-wrap__icon'/>
			{/*<img className='title-wrap__icon'*/}
			{/*		 src={changeSvg}*/}
			{/*		 alt="change list"*/}
			{/*		 onClick={editTitle}/>*/}
		</div>

	)
}
