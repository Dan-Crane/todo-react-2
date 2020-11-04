import React from "react";

import './Input.scss'

export const Input = ({placeholder, type, value, setValue, autoFocus, onBlur, name}) => {
	return (
		<div className='input-wrap'>
			<label htmlFor={name} className="inp">
				<input type={type}
							 name={name}
							 id={name}
							 placeholder='&nbsp;'
							 value={value}
							 autoFocus={autoFocus || false}
							 onChange={setValue}
							 onBlur={onBlur || null}/>
				<span className="label">{placeholder}</span>
				<span className="focus-bg"/>
			</label>
		</div>
	)

}
