import {db} from '../firebase'

export const apiFirebase = (collectionName) => {
	const collection = db.collection(collectionName)

	return (query = () => collection) => {
		return query(collection)
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
}

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

export const deleteTask = (idTask) => {
	return db.collection("tasks").doc(idTask).delete()
		.catch((error) => {
			console.error("Error removing document: ", error);
		});
}
