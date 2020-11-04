import * as apiFirebase from "../api/apiFirebase";

// auth
export const logInUser = (email, password) => {
	return apiFirebase.logInUser(email, password).then(() => ({}))
}
export const logOutUser = () => {
	return apiFirebase.logOutUser().then(() => ({}))
}
export const register = (email, password) => {
	return apiFirebase.register(email, password).then(() => ({}))
}
export const setAuth = () => {
	return dispatch => apiFirebase.setAuth(user => {
		return user ? dispatch({
			type: 'LOGIN_USER',
			payload: {
				user
			}
		}) : dispatch({
			type: 'LOGOUT_USER'
		});
	})
}

export function resetPassword(email) {
	return apiFirebase.sendPasswordResetEmail(email)
}

// DB
export const getColors = () => {
	return apiFirebase.getColors()
		.then(colors => ({
			type: 'GET_COLORS',
			payload: {
				colors
			}
		}))
}
export const getLists = (userId) => {
	return apiFirebase.getLists(userId)
		.then(lists => ({
			type: 'GET_LISTS',
			payload: {
				lists
			}
		}))
}

export const createList = (obj) => {
	return apiFirebase.createList(obj)
		.then(obj => ({
			type: 'CREATE_LIST',
			payload: {
				obj
			}
		}))
}

export const updateList = (listId, data) => {
	return apiFirebase.updateList(listId, data)
		.then(list => ({
			type: 'UPDATE_LIST',
			payload: {
				list
			}
		}))
}

export const deleteList = (listId) => {
	return apiFirebase.deleteList(listId)
		.then(listId => ({
			type: 'DELETE_LIST',
			payload: {
				listId
			}
		}))
}

export const getTasks = (userId) => {
	return apiFirebase.getTasks(userId)
		.then(tasks => ({
			type: 'GET_TASKS',
			payload: {
				tasks
			}
		}))
}

// export const getImportantTasks = (userId) => {
// 	return apiFirebase.getImportantTasks(userId)
// 		.then(tasks => ({
// 			type: 'GET_LIST_TASKS',
// 			payload: {
// 				tasks
// 			}
// 		}))
// }
//
// export const getPlannedTasks = (userId) => {
// 	return apiFirebase.getPlannedTasks(userId)
// 		.then(tasks => ({
// 			type: 'GET_LIST_TASKS',
// 			payload: {
// 				tasks
// 			}
// 		}))
// }

export const getListTasks = (listId) => {
	return apiFirebase.getListTasks(listId)
		.then(tasks => ({
			type: 'GET_LIST_TASKS',
			payload: {
				tasks
			}
		}))
}

export const createTask = (data) => {
	return apiFirebase.createTask(data)
		.then(task => ({
			type: 'CREATE_TASK',
			payload: {
				task
			}
		}))
}

export const updateTask = (taskId, data) => {
	return apiFirebase.updateTask(taskId, data)
		.then(task => ({
			type: 'UPDATE_TASK',
			payload: {
				task
			}
		}))
}

export const deleteTask = (taskId) => {
	return apiFirebase.deleteTask(taskId)
		.then(taskId => ({
			type: 'DELETE_TASK',
			payload: {
				taskId
			}
		}))
}
