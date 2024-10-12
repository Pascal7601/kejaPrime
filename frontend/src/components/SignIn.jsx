import React, {useState} from 'react';
import '../styles/SignIn.css';
import {Link, useNavigate} from 'react-router-dom';
import Validation from '../LoginValidation.jsx';
import axios from 'axios';

const SignIn = () => {
	const [values, setValues] = useState({
		email: '',
		password: ''
	});
	const [errors, setErrors] = useState({});
	const navigate =useNavigate();

	const handleInput = (event) => {
		setValues(prev => ({...prev, [event.target.name]: event.target.value}))
	}
	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrors(Validation(values));

		try {
			console.log("Submitting form");
			const response = await axios.post('http://localhost:8000/api/v1/auth/sign_in', values); // Post to backend
			console.log(response.data);
			// alert('User registered successfully!');
			if (response.status == 200) {
				const { access_token, token_type } = response.data;

				// store token securely on local storage
				localStorage.setItem('access_token', access_token);
				localStorage.setItem('token_type', token_type);
				navigate('/home'); // Redirect to sign-in page
			} else {
				console.error('Login was unsuccessful. Response:', response);
			}
		} catch (error) {
			console.error('There was an error signing in:', error);
			// alert('Error registering user. Please try again.');
		}
	}

  return (
	<div className='sign-in-container container mt-5 addUser'>
		<h2> Sign In</h2>
		<form action='' onSubmit={handleSubmit} className='addUserform'>
			<div className='form-group mb-3 mt-1'>
				<label htmlFor="email"> Email:</label>
				<input
					type="email"
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
					type="password"
					name='password'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your password'
					onChange={handleInput}
				/>
				{errors.password && <span className='text-danger'> {errors.password} </span>}
			</div>
			<button type='submit' className='btn btn-primary'> Sign In</button>
		</form>
		<div className='login'>
			<p>Don't have an account ?</p>
			<Link to='/Sign-up' type='submit' className='btn btn-success w-50'> Sign Up</Link>
		</div>
	</div>
  )
}

export default SignIn
