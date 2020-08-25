import React, {useContext} from "react";

import './BodyTitile.scss'

import {DBContext} from "../../../context/store";

import {api} from "../../../api/api";
import {NavLink, useRouteMatch} from "react-router-dom";
import {PreloaderCircle} from "../../PreloaderCircle/PreloaderCrcle";

export const TitleBody = ({list, colorTitle}) => {

	return (
		<div className='body__title title-wrap'>
			<NavLink to={`/list/${list.id}`}>
				<h2 style={{color: colorTitle}} className='title-wrap__title'>
					{list.name}
				</h2>
			</NavLink>
			<abbr data-icon="c" className='title-wrap__icon'></abbr>
			{/*<img className='title-wrap__icon'*/}
			{/*		 src={changeSvg}*/}
			{/*		 alt="change list"*/}
			{/*		 onClick={editTitle}/>*/}
		</div>

	)
}
