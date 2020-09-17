import {useContext} from 'react'

import {StoreContext} from '../context/store'

export const useStore = () => {
	const {state, actions} = useContext(StoreContext)

	return {
		state,
		actions
	}
}
