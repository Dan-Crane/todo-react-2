import firebase from 'firebase'

firebase.initializeApp({
	apiKey: "AIzaSyALHylLYz6xsh9K-s7S4z95H-TT_MYbi7Y",
	authDomain: "react-todo-2-9ae81.firebaseapp.com",
	databaseURL: "https://react-todo-2-9ae81.firebaseio.com",
	projectId: "react-todo-2-9ae81",
	storageBucket: "react-todo-2-9ae81.appspot.com",
	messagingSenderId: "517163262187",
	appId: "1:517163262187:web:0916a8bbf97756fd8b1eae"
});

export const db = firebase.firestore();
export const auth = firebase.auth();
