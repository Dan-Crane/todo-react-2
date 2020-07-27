import React from "react";

import './TitileBody.scss'

import changeSvg from '../../../assets/icons/changeSvg.svg'

export const TitleBody = ({ title }) => {
	return (
		<div className='body__title title-wrap'>
			<h2 className='title-wrap__title'>
				{title}
			</h2>
			<img className='title-wrap__icon'
					 src={changeSvg}
					 alt="change list"/>
		</div>

	)
}
