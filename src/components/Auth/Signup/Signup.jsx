import React, {useState} from "react";

import {Link, useHistory} from "react-router-dom"


import './Signup.scss'
import {useStore} from "../../../hooks/store";
import {Input} from "../../InputComponent/Input";
import {CSSTransition} from "react-transition-group";
import {useInput} from "../../../hooks/InputValidate";

export function Signup() {
	const email = useInput('')
	const password = useInput('')
	const passwordConfirm = useInput('')
	const {actions} = useStore()
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		if (password.value !== passwordConfirm.value) {
			return setError(true)
		}

		try {
			setError(false)
			setLoading(true)
			await actions.register(email.value, password.value)
			history.push("/")
		} catch {
			setError(true)
		}

		setLoading(false)
	}


	return (
		<div className='auth'>
			<section className='signup main-form'>
				<div className='signup__body main-form__body'>
					<h2 className='signup__header main-form__title'>Регистрация</h2>

					<form className='signup__form' onSubmit={handleSubmit}>
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

						<div className='main-form__item'>
							<CSSTransition in={passwordConfirm.isDirty}
														 classNames='main-form__error-wrap'
														 timeout={300}
														 mountOnEnter
														 unmountOnExit>
						<span
							className='login__error main-form__small-error'>
							{passwordConfirm.errors.message}
						</span>
							</CSSTransition>

							<Input placeholder='Подтвердите пароль'
										 type='password'
										 name='passwordConfirm'
										 value={passwordConfirm.value}
										 setValue={e => passwordConfirm.handleChange(e)}
										 onBlur={e => passwordConfirm.handleBlur(e)}/>
						</div>

						<div className='main-form__wrap'>
							<button type='submit' className='main-btn signup__btn main-form__btn'
											disabled={email.btnDisable || loading || password.btnDisable || passwordConfirm.btnDisable}>
								Зарегестрироваться
							</button>

							<CSSTransition in={error}
														 classNames='main-form__error-wrap'
														 timeout={300}
														 mountOnEnter
														 unmountOnExit>
								<span
									className={`login__error main-form__error`}>Ошибка</span>
							</CSSTransition>
						</div>

					</form>
				</div>
				<div className="signup__desc main-form__desc">
					Есть аккаунт? <Link to="/login">Войти</Link>
				</div>
			</section>
		</div>

	)
}

