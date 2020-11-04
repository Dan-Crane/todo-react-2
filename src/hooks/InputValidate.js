import {useEffect, useState} from "react";

import * as Y from 'yup'

let scheme = Y.object().shape({
	title: Y.string()
		.required('Обязательное поле')
		.min(4, 'Слишком короткий')
		.max(60, 'Слишком длинный'),

	email: Y.string()
		.required('Обязательное поле')
		.email('Некоректный эмеил')
		.max(60, 'Слишком длинный'),

	password: Y.string()
		.required('Обязательное поле')
		.min(4, 'Слишком короткий')
		.max(60, 'Слишком длинный'),
})

let convert = (errors) => {
	return errors.inner.reduce((z, item) => {
		return z[item.path] ? z : {...z, [item.path]: item.message}
	})
}

export function useInputValidation(value, validations) {
	const [isEmpty, setIsEmpty] = useState(true)
	const [minLengthError, setMinLengthError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [errorMessage, setErrorMessage] = useState({
		isEmpty: '',
		minLength: '',
		emailError: '',
	})
	useEffect(() => {
		for (const validationsKey in validations) {
			switch (validationsKey) {
				case 'isEmpty':
					value ? setIsEmpty(false) : setIsEmpty(true)
					setErrorMessage(state => ({...state, isEmpty: 'Обязательное поле'}))
					break

				case 'isEmail' :
					const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
					setErrorMessage(state => ({...state, emailError: 'Некоректный эмеил'}))
					break


				case 'minLength':
					value.length < validations[validationsKey] ? setMinLengthError(true) : setMinLengthError(false)
					setErrorMessage(state => ({...state, minLength: 'Короткое поле'}))
					break
			}
		}
	}, [value])

	return {
		isEmpty,
		minLengthError,
		emailError,
		errorMessage,
	}
}

export function useInput(initialValue, validationsObj) {
	const [value, setValue] = useState(initialValue)
	const [errors, setErrors] = useState('')
	const [isDirty, setIsDirty] = useState(false)

	// const valid = useInputValidation(value, validationsObj)

	async function handleChange(event) {
		let {target: {type, name, value, checked, selected}} = event
		value = type === 'checkbox' ? checked :
			type === 'select' ? selected : value

		let errors = await scheme.validateAt(name, {[name]: value}, {abortEarly: false})
			.then(_ => ({[name]: null}))
			.catch(convert)

		await setValue(s => value)
		await setErrors(errors)

		if (errors[name] !== null) {
			return setIsDirty(true)
		} else {
			return setIsDirty(false)
		}
	}

	async function onBlur(event) {
		let {target: {type, name, value, checked, selected}} = event
		value = type === 'checkbox' ? checked :
			type === 'select' ? selected : value

		let errors = await scheme.validateAt(name, {[name]: value}, {abortEarly: false})
			.then(_ => ({[name]: null}))
			.catch(convert)

		await setValue(s => value)
		await setErrors(errors)

		if (errors[name] !== null) {
			return setIsDirty(true)
		} else {
			return setIsDirty(false)
		}
	}

	return {
		value,
		handleChange,
		errors,
		onBlur,
		isDirty,
		// ...valid,
	}
}