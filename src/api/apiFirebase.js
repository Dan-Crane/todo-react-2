import {db} from '../firebase'

export const apiFirebase = (collectionName) => {
	const collection = db.collection(collectionName)

	return (query=()=>collection) => {
		return  query(collection)
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
