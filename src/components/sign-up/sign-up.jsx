import { useState } from 'react'
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}
const SignUp = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { displayName, email, password, confirmPassword } = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		//password check
		if (password !== confirmPassword) {
			alert('Passwords do not match')
			return
		}
		//sign in with email and password and creating a user document
		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password)
			await createUserDocumentFromAuth(user, { displayName })
			resetFormFields()
		} catch (error) {
			if(error.code === 'auth/email-already-in-use'){
				alert('Email is already in use')
			} else {
				console.log('Could not create account',error)
			}
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>

				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<FormInput
					label = 'Confirm Password'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>
				<button type='submit'>Sign Up</button>
			</form>
		</>
	)
}

export default SignUp


