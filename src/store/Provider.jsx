import React, {useReducer, useMemo} from "react";

import {StoreContext} from "../context/store";
import {bindActions} from "./utils";

export const Provider = ({initialState, reducer, actions, children}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const memoizedActions = useMemo(() => bindActions(actions, dispatch), [actions, dispatch])

	const memoizedStore = useMemo(() => ({
		state,
		actions: memoizedActions
	}), [state, memoizedActions])

	return (
		<StoreContext.Provider value={memoizedStore}>
			{children}
		</StoreContext.Provider>
	)
}
