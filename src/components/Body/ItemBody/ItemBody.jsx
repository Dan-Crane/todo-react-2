import React, {useState} from "react";

import './ItemBody.scss'

export const ItemBody = ({tasks}) => {
	const [editMode, setEditMode] = useState(false)

	const toggleEditMode = () => {
		setEditMode((s)=> !s)
	}

	return (
		<div className='body__item-tasks item-task'>
			{tasks.map(t => {
				return (
					<div key={t.id} className='item-task__row'>
						<div className='item-task__checkbox'>
							<input id={`check-${t.id}`} type='checkbox'/>
							<label htmlFor={`check-${t.id}`}>
								<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5"
												strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</label>
						</div>
						{editMode
							? <input value={t.text}/>
							: <span onClick={toggleEditMode}
											className='item-task__input'>{t.text}</span>
						}

					</div>
				)
			})}

		</div>
	)
}
