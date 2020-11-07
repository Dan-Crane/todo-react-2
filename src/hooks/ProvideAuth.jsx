import {useState, useEffect} from "react";

import {auth} from '../firebase'

export function useProvideAuth() {

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const signin = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
			.then(response => {
				setUser(response.user);
				return response.user;
			});
	};

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
			.then(response => {
				setUser(response.user);
				return response.user;
			});
	};

	const signout = () => {
		return auth.signOut()
			.then(() => {
				setUser(false);
			});
	};

	const sendPasswordResetEmail = email => {
		return auth.sendPasswordResetEmail(email)
			.then(() => {
				return true;
			});
	};

	const confirmPasswordReset = (code, password) => {
		return auth.confirmPasswordReset(code, password)
			.then(() => {
				return true;
			});
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
				setIsLoading(false)
			} else {
				setUser(false);
				setIsLoading(false)
			}
		});

		return () => unsubscribe();
	}, []);

	return {
		isLoading,
		user,
		signin,
		signup,
		signout,
		sendPasswordResetEmail,
		confirmPasswordReset,
	};

}