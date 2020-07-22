import React from "react";

import './Body.scss'

import {TitleBody} from "./TitileBody/TitileBody";
import {ItemBody} from "./ItemBody/ItemBody";

export const Body = () => {
	return (
		<section className='body'>
			<TitleBody/>
			<ItemBody/>
		</section>
	)
}
