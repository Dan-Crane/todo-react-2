import React from "react";

import './Input.scss'

export const Input = ({placeholder, type, value, setValue, autoFocus}) => {
	return (
		<div className='input-wrap'>
			<label htmlFor="inp" className="inp">
				<input type={type}
							 id='inp'
							 placeholder='&nbsp;'
							 value={value}
							 autoFocus={autoFocus || false}
							 onChange={(event => setValue(event.target.value))}/>
				<span className="label">{placeholder}</span>
				<span className="focus-bg"/>
			</label>
		</div>
	)

}
