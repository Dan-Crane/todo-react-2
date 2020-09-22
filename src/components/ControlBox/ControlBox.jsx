import React from "react";
import {CSSTransition} from "react-transition-group";

import {useOutsideAlerter} from "../../hooks/OutsideAlerter";

import './ControlBox.scss'

export const ControlBox = ({children}) => {
	return (
		<ul className='control-box'>
			{children}
		</ul>
	)
}

export const ControlItem = ({icon, sendFunc, children, color}) => {

	const {visible, setVisible, ref} = useOutsideAlerter(false)

	const handlerSendFunction = (e) => {
		e.preventDefault()
		setVisible(!visible)
		sendFunc && sendFunc()
	}
	return (
		<li className='control-box__list'>
			<div style={color ? {color: color} : {color: 'black'}} className='control-box__btn-icon'
				 onClick={handlerSendFunction} tabIndex={0}>
				{icon}
			</div>

			{children &&
			<CSSTransition
				in={visible}
				timeout={300}
				classNames='display-dropdown'
				unmountOnExit>
				<div
					ref={ref}
					className='display-dropdown__wrap'>

					{children}

				</div>
			</CSSTransition>
			}
		</li>
	)
}
