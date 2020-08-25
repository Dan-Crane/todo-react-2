import {db, auth} from '../firebase'

// auth


// db

export const getLists = () => {
	return db.collection('lists')
		.get()
		.then(snapshot => {
			const response = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}))
			return response
		})
		.catch(error => {
			console.log("Error getting documents: ", error);
		});
}

export const getTasks = (listId) => {
	return db.collection('tasks')
		.where('listId', '==', listId)
		.get()
		.then(snapshot => {
			const response = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}))
			return response
		})
		.catch(error => {
			console.log("Error getting documents: ", error);
		});
}
export const getListTasks = () => {
	return db.collection('tasks')
		.where('listId', '==', '')
		.get()
		.then(snapshot => {
			const response = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}))
			return response
		})
		.catch(error => {
			console.log("Error getting documents: ", error);
		});
}

export const createTask = (data) => {
	return db.collection("tasks").add({
		...data,
		completed: false,
	})
		.then(docRef => docRef.get())
		.then(task => ({
			id: task.id,
			...task.data()
		}))

		.catch(function (error) {
			console.error("Error adding document: ", error);
		});
}

export const updateTask = (taskId, data) =>{
	return db.collection("tasks").doc(taskId).update(data)
		.then(() => ({
			id: taskId,
			...data
		}))
}

export const deleteTask = (taskId) => {
	return db.collection("tasks").doc(taskId).delete()
		.then(() => taskId)
		.catch((error) => {
			console.error("Error removing document: ", error);
		});
}
