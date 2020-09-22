import React from "react";

import './DropdownMenu.scss'

export const DropdownMenu = ({icon, children}) => {

	return (
		<ul
			className='dropdown'>

			{children}

		</ul>
	)
}

export const DropdownItem = ({icon, children, sendFunc}) => {

	return (
		<li
			tabIndex={0}
			onClick={() => {
				sendFunc && sendFunc()
			}}
			className='dropdown__item'>
			<a
				tabIndex={-1}
				className='dropdown__icon'>

				{icon}

			</a>
			<span
				className='dropdown__text'>

				{children}

			</span>
		</li>
	)
}
