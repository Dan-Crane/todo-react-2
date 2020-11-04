import React, { useRef, useState } from "react"
import {CSSTransition} from "react-transition-group";
import { Link } from "react-router-dom"

import {useStore} from "../../../hooks/store";
import {useInput} from "../../../hooks/InputValidate";

import './ForgotPassword.scss'

import {Input} from "../../InputComponent/Input";

export function ForgotPassword() {
	const emailRef = useRef()
	const { actions } = useStore()
	const [error, setError] = useState(false)
	const [message, setMessage] = useState(false)
	const [loading, setLoading] = useState(false)
	const email = useInput('')

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setMessage(false)
			// setError("")
			setLoading(true)
			await actions.resetPassword(emailRef.current.value)
			setMessage(true)
		} catch {
			setError(true)
		}

		setLoading(false)
	}

	return (
		<>
			<section className='main-form forgot-pass'>
				<div className='main-form__body forgot-pass__body'>
					<h2 className='main-form__title forgot-pass__title'>Востановить пароль</h2>

					<form className='main-form__form forgot-pass__form' onSubmit={handleSubmit}>
						<div className='main-form__item forgot-pass__item'>
							<CSSTransition in={email.isDirty}
														 classNames='main-form__error-wrap'
														 timeout={300}
														 mountOnEnter
														 unmountOnExit>
						<span
							className='main-form__small-error forgot-pass__small-error'>
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

						<div className='main-form__wrap'>
							<button type='submit' className='main-btn signup__btn login__btn main-form__btn'
											disabled={email.btnDisable || loading}>
								Востановить
							</button>

							<CSSTransition in={error}
														 classNames='main-form__error-wrap'
														 timeout={300}
														 mountOnEnter
														 unmountOnExit>
								<span className='login__error main-form__error'>Ошибка</span>
							</CSSTransition>
						</div>

					</form>
					<div className="login__forgot main-form__desc">
						<Link to="/login">Авторизация</Link>
					</div>

				</div>

				<div className="login__desc main-form__desc">
					Нужен аккаунт? <Link to="/signup">Регистрация</Link>
				</div>
			</section>
		</>
	)
}