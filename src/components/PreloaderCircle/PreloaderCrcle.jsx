import React from "react";

import './PreloaderCrcle.scss'

export const PreloaderCircle = () => {
	return (
		<div className='loader-wrap'>
			<div className='loader'>
				<div className='circle'></div>
				<div className='circle'></div>
				<div className='circle'></div>
			</div>
		</div>

	)
}
