import React, {useState} from "react";

import './ControlBox.scss'

export const ControlBox = ({ children }) => {
	return (
		<ul className='control-box'>
				{ children }
		</ul>
	)
}

export const ControlItem = ({ icon, sendFunc, children, color }) => {
	const [open, setOpen] = useState(false)
	const handlerSendFunction = (e) => {
		e.preventDefault()
		setOpen(!open)
		sendFunc && sendFunc()
	}

	return (
		<li className='control-box__list'>
			<a href="" style={color && {color: color} || {color: 'black'}} className='control-box__btn-icon' onClick={handlerSendFunction} tabIndex={0}>
				{ icon }
			</a>

			{open && children}
		</li>
	)
}
