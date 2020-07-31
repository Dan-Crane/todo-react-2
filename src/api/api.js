import * as axios from "axios";

const instanceApi = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:3001/'
})

export const api = {

	getLists() {
		return instanceApi.get('lists?_expand=color&_embed=tasks')
			.then(res => res.data)
	},
	getColors() {
		return instanceApi.get('colors')
			.then(res => res.data)
	},

	addList(list) {
		return instanceApi.post('lists', list)
			.then(res => res.data)
	},

	deleteList(id) {
		return instanceApi.delete('lists/' + id)
			.then(res => res.data)
	},

	changeTitle(id, title) {
		return instanceApi.patch('lists/' + id, {name: title})
	},

	addTask(id, task) {
		return instanceApi.post(`tasks/`, task)
	},

	removeTask(id) {
		return instanceApi.delete('tasks/' + id)
	},

	editTask(obj) {
		return instanceApi.patch('tasks/' + obj.id, {text: obj.text})
	}
}
