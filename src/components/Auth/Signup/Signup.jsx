import React, {useRef, useState} from "react";

import {Link, useHistory} from "react-router-dom"


import './Signup.scss'
import {useStore} from "../../../hooks/store";
import {Input} from "../../InputComponent/Input";
import {CSSTransition} from "react-transition-group";

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
			setError(false)
			setLoading(true)
			await actions.register(emailValue, passwordValue)
			history.push("/")
		} catch {
			setError(true)
		}

		setLoading(false)
	}


	return (
		<section className='signup auth'>
			<div className='signup__body'>
				<h2 className='signup__header auth-title'>Регистрация</h2>
				<CSSTransition in={error}
											 classNames='signup__error-wrap'
											 timeout={300}
											 mountOnEnter
											 unmountOnExit>

					<span className='signup__error auth-error'>Ошибка регистрации</span>

				</CSSTransition>
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

