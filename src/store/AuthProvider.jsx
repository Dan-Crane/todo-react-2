import React from "react";
import {AuthContext} from "../context/AuthContext";
import {useProvideAuth} from "../hooks/ProvideAuth";
import {PreloaderCircle} from "../components/PreloaderCircle/PreloaderCrcle";

export function AuthProvider({children}) {
	const auth = useProvideAuth()

	return (
		<AuthContext.Provider value={auth}>
			{auth.isLoading
				? <div className='loader-center'><PreloaderCircle/></div>
				: children}
		</AuthContext.Provider>
	)
}
