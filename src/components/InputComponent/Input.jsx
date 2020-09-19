import React, {useState} from "react";

import './Input.scss'

export const Input = ({placeholder, text, type}) => {
	const [input, setInput] = useState(text)
	return (
		<div className='input-wrap'>
			<label htmlFor="inp" className="inp">
				<input type={type}
							 id='inp'
							 placeholder='&nbsp;'
							 value={input}
							 autoFocus
							 onChange={(event => setInput(event.target.value))}/>
				<span className="label">{placeholder}</span>
				<span className="focus-bg"/>
			</label>
		</div>
	)

}
