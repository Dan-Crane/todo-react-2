import React, {useRef, useState} from "react";

import {Link, useHistory} from "react-router-dom"


import './Signup.scss'
import {useStore} from "../../../hooks/store";
import {Input} from "../../InputComponent/Input";

export function Signup() {
	const [emailValue, setEmailValue] = useState('')
	const [passwordValue, setPasswordValue] = useState('')
	const [passwordConfirmValue, setPasswordConfirmValue] = useState('')
	const {actions} = useStore()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		if (passwordValue !== passwordConfirmValue) {
			return setError("Пароли не соответстуют")
		}

		try {
			setError("")
			setLoading(true)
			await actions.register(emailValue, passwordValue)
			history.push("/")
		} catch {
			setError("Ошибка при создании аккаунта")
		}

		setLoading(false)
	}


	return (
		<section className='signup'>
			<div className='signup__body'>
				<h2 className='signup__header'>Регистрация</h2>
				{error && <span className='signup__error'>{error}</span>}
				<form className='signup__form' onSubmit={handleSubmit}>
					<Input placeholder='Email' type='email' setValue={setEmailValue} value={emailValue} autoFocus/>
					<Input placeholder='Пароль' type='password' setValue={setPasswordValue} value={passwordValue}/>
					<Input placeholder='Подтвержение пароля' type='password' setValue={setPasswordConfirmValue}
								 value={passwordConfirmValue}/>
					<button className='main-btn signup__btn'
									disabled={loading}>
						Зарегестрироваться
					</button>

				</form>
			</div>
			<div className="signup__desc">
				Already have an account? <Link to="/login">Log In</Link>
			</div>
		</section>
	)
}

