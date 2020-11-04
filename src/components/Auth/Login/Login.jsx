import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {CSSTransition} from "react-transition-group";

import {useStore} from "../../../hooks/store";
import {useInput} from "../../../hooks/InputValidate";

import {Input} from "../../InputComponent/Input";

import './Login.scss'

export function Login() {
	const [emailValue, setEmailValue] = useState('')
	const [passwordValue, setPasswordValue] = useState('')
	const {actions} = useStore()
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const email = useInput('', {minLength: 3, isEmpty: true, isEmail: true,})

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setError("")
			setLoading(true)
			await actions.logInUser(emailValue, passwordValue)
			history.push("/")
		} catch {
			setError("Failed to log in")
		}

		setLoading(false)
	}

	return (
		<section className='login user'>
			<div className='login__body user__body'>
				<h2 className='login__title user__title'>Войти в аккаунт</h2>
				<CSSTransition in={error}
											 classNames='user__error-wrap'
											 timeout={300}
											 mountOnEnter
											 unmountOnExit>
					<span className='login__error user__error'>Ошибка входа</span>
				</CSSTransition>
				<form className='login__form user__form'>

					<CSSTransition in={email.isDirty}
												 classNames='user__error-wrap'
												 timeout={300}
												 mountOnEnter
												 unmountOnExit>
						<span
							className='login__error user__small-error'>
							{email.errors.message}
						</span>
					</CSSTransition>

					<Input placeholder='Email'
								 type='email'
								 name='email'
								 value={email.value}
								 setValue={e => email.handleChange(e)}
								 onBlur={email.onBlur}
								 autoFocus/>
					<Input placeholder='Пароль' type='password' setValue={setPasswordValue} value={passwordValue}/>

					<button className='main-btn signup__btn'
									disabled={loading}>
						Зарегестрироваться
					</button>

				</form>

				<div className="w-100 text-center mt-3">
					<Link to="/forgot-password">Forgot Password?</Link>
				</div>

			</div>

			<div className="w-100 text-center mt-2">
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</section>
	)
}