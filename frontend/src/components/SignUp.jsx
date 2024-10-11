import React, {useState} from 'react'
import '../styles/SignUp.css'
import {Link} from 'react-router-dom'
import Validation from '../LoginValidation.jsx';


const SignUp = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: ''
	});
	const [errors, setErrors] = useState({});

	const handleInput = (event) => {
		setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		setErrors(Validation(values));
	}
  return (
	<div className='sign-up-container container mt-5 mb-3 addUser'>
		<h2> Sign Up</h2>
		<form action='' onSubmit={handleSubmit} className='addUserform'>
			<div className=' form-group mb-3 inputGroup'>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					className='form-control'
					name='name'
					autoComplete='off'
					placeholder='Enter your username'
					onChange={handleInput}
				/>
				{errors.name && <span className='text-danger'> {errors.name} </span>}
			</div>
			<div className='form-group mb-3'>
				<label htmlFor="email"> Email:</label>
				<input
					type="text"
					name='email'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your email'
					onChange={handleInput}
				/>
				{errors.email && <span className='text-danger'> {errors.email} </span>}
			</div>
			<div className='form-group mb-3'>
				<label htmlFor="password"> Password:</label>
				<input
					type="text"
					name='password'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your password'
					onChange={handleInput}
				/>
				{errors.password && <span className='text-danger'> {errors.password} </span>}
			</div>
			<button type='submit' className='btn btn-primary'> Sign Up</button>
		</form>
		<div className='login'>
			<p>Already have an account ?</p>
			<Link to='/Sign-in' type='submit' className='btn btn-success w-50'> Sign In</Link>
		</div>
	</div>
  )
}

export default SignUp
