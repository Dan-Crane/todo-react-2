import React, {useReducer, useMemo, useEffect} from "react";

import {StoreContext} from "../context/store";
import {bindActions} from "./utils";
import {PreloaderCircle} from "../components/PreloaderCircle/PreloaderCrcle";

export const Provider = ({initialState, reducer, actions, children}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const memoizedActions = useMemo(() => bindActions(actions, dispatch), [actions, dispatch])

	const memoizedStore = useMemo(() => ({
		state,
		actions: memoizedActions
	}), [state, memoizedActions])

	useEffect(() => {
		async function unsubscribe() {
			await memoizedStore.actions.setAuth()
		}

		unsubscribe()

		return () => unsubscribe()
	}, [state.user])

	return (
		<StoreContext.Provider value={memoizedStore}>
			{state.isLoading
				? <div className='loader-center'><PreloaderCircle/></div>
				: children}
		</StoreContext.Provider>
	)
}
