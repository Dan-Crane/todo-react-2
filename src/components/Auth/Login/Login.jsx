import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {CSSTransition} from "react-transition-group";

import {useStore} from "../../../hooks/store";
import {useInput} from "../../../hooks/InputValidate";

import {Input} from "../../InputComponent/Input";

import './Login.scss'

export function Login() {
	const {actions} = useStore()
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	const email = useInput('')
	const password = useInput('')


	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setError(false)
			setLoading(true)
			await actions.logInUser(email.value, password.value)
			history.push("/")
		} catch {

			setError(true)
		}

		setLoading(false)
	}

	return (
		<section className='login main-form'>
			<div className='login__body main-form__body'>
				<h2 className='login__title main-form__title'>Войти в аккаунт</h2>

				<form className='login__form main-form__form' onSubmit={handleSubmit}>
					<div className='main-form__item'>
						<CSSTransition in={email.isDirty}
													 classNames='main-form__error-wrap'
													 timeout={300}
													 mountOnEnter
													 unmountOnExit>
						<span
							className='login__error main-form__small-error'>
							{email.errors.message}
						</span>
						</CSSTransition>

						<Input placeholder='Email'
									 type='email'
									 name='email'
									 value={email.value}
									 setValue={e => email.handleChange(e)}
									 onBlur={e => email.handleBlur(e)}
									 autoFocus/>
					</div>

					<div className='main-form__item'>
						<CSSTransition in={password.isDirty}
													 classNames='main-form__error-wrap'
													 timeout={300}
													 mountOnEnter
													 unmountOnExit>
						<span
							className='login__error main-form__small-error'>
							{password.errors.message}
						</span>
						</CSSTransition>

						<Input placeholder='Пароль'
									 type='password'
									 name='password'
									 value={password.value}
									 setValue={e => password.handleChange(e)}
									 onBlur={e => password.handleBlur(e)}/>
					</div>

					<div className='main-form__wrap'>
						<button type='submit' className='main-btn signup__btn login__btn main-form__btn'
										disabled={password.btnDisable || email.btnDisable || loading}>
							Войти
						</button>

						<CSSTransition in={error}
													 classNames='main-form__error-wrap'
													 timeout={300}
													 mountOnEnter
													 unmountOnExit>
							<span className='login__error main-form__error'>Ошибка авторизации</span>
						</CSSTransition>
					</div>

				</form>
				<div className="login__forgot main-form__desc">
					<Link to="/forgot-password">Забыли пароль?</Link>
				</div>

			</div>

			<div className="login__desc main-form__desc">
				Нужен аккаунт? <Link to="/signup">Регистрация</Link>
			</div>
		</section>
	)
}