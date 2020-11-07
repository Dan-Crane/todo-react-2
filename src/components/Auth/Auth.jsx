import React, {useState} from "react";

import './Auth.scss'

import {useStore} from "../../hooks/store";
import {Signup} from "./Signup/Signup";
import {Login} from "./Login/Login";
import {ForgotPassword} from "./ForgotPassword/ForgotPassword";

export const Auth = () => {
	const {actions} = useStore()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()
		
		try {
			await actions.register(email, password)
		} catch {
			console.log('test')
		}
	}

	return (
		<div className='auth'>
			<Signup/>
			<Login/>
			<ForgotPassword/>
		</div>
	)
}
