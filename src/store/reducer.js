export const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_LISTS':
			return {
				...state,
				lists: action.payload.lists
			}
		case 'GET_LIST_TASKS':
			return {
				...state,
				tasks: action.payload.tasks
			}
		case 'GET_TASKS':
			return {
				...state,
				tasks: action.payload.tasks
			}
		case 'CREATE_TASK':
			return {
				...state,
				tasks: state.tasks.push(action.payload.task)
			}
		case 'UPDATE_TASK':
			return {
				...state,
				tasks: state.tasks.map(t => {
					if (t.id === action.payload.task.id) {
						return {
							...t,
							...action.payload.task
						}
					}
					return t
				})
			}
		case 'DELETE_TASK':
			return {
				...state,
				tasks: state.filter(t => t.id !== action.payload.taskId)
			}
		default:
			return state
	}
}
