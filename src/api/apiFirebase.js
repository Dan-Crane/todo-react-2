import {db} from '../firebase'

export const apiFirebase = (collection) => {
	return db.collection(collection)
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
