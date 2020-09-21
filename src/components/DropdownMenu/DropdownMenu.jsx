import React, {useState} from "react";

import './DropdownMenu.scss'

export const DropdownMenu = ({icon, children}) => {
	const [open, setOpen] = useState(false)
	const [activeMenu, setActiveMenu] = useState('main')

	return (
		<ul
			className='dropdown'>
			<li
				className='dropdown__li'>
				<a
					className='dropdown__link' onClick={() => setOpen(!open)}>
					{icon}
				</a>

				{open && children}
			</li>
		</ul>
	)
}

export const DropdownItem = (goToMenu) => {
	// return (
		// <a href="#" className='dropdown__item' onClick={() => goToMenu && setActiveMenu(goToMenu)}></a>
	// )
}
