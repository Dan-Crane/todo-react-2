import React from 'react';
import classNames from 'classnames'

import './Badge.scss'
export const Badge = ({color, className, onClick}) => {
	return (
		<i className={classNames('badge', {[`badge--${color}`]: color}, className)}
			 onClick={onClick}></i>
	);
}

