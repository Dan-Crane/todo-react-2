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
			{/*<form>*/}
			{/*	<h3 className='auth__title'>Войдите в React ToDo</h3>*/}
			{/*	<input*/}
			{/*		type="email"*/}
			{/*		onChange={event => setEmail(event.target.value)}*/}
			{/*		value={email}*/}
			{/*	/>*/}
			{/*	<input type="password"*/}
			{/*				 onChange={event => setPassword(event.target.value)}*/}
			{/*				 value={password}/>*/}


			{/*	<button onClick={(e) => {*/}
			{/*		e.preventDefault()*/}
			{/*		actions.logInUser(email, password)*/}
			{/*	}}>Войти*/}
			{/*	</button>*/}
			{/*	<button onClick={handleSubmit}>Зарегистрироваться*/}
			{/*	</button>*/}
			{/*</form>*/}
			{/*<Signup/>*/}
			{/*<Login/>*/}
			<ForgotPassword/>
		</div>
	)
}
