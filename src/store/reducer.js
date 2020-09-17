export const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			return {
				...state,
				user: action.payload.user
			}
		case 'LOGOUT_USER':
			return {
				...state,
				user: null
			}
		case 'GET_COLORS':
			return {
				...state,
				colors: action.payload.colors
			}
		case 'GET_LISTS':
			return {
				...state,
				lists: action.payload.lists.map(l => ({
					...l,
					color: state.colors.find(c => c.id === l.colorId)
				}))
			}
		case 'CREATE_LIST':
			return {
				...state,
				lists: [...state.lists, action.payload.obj]
			}
		case 'DELETE_LIST':
			return {
				...state,
				lists: state.lists.filter(l => l.id !== action.payload.listId)
			}
		case 'GET_TASKS':
			return {
				...state,
				tasks: action.payload.tasks
			}
		case 'GET_LIST_TASKS':
			return {
				...state,
				tasks: action.payload.tasks
			}
		case 'CREATE_TASK':
			return {
				...state,
				tasks: [...state.tasks, action.payload.task]
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
				tasks: state.tasks.filter(t => t.id !== action.payload.taskId)
			}
		default:
			return state
	}
}
