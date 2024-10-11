import React, {useState} from 'react'
import '../styles/SignUp.css'
import {Link} from 'react-router-dom'
import Validation from '../LoginValidation.jsx';


const SignUp = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		location: '',
		role:''   // new field for user type (property owner or renter)
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
				<label htmlFor="location"> Location:</label>
				<input
					type="text"
					name='location'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your location'
					onChange={handleInput}
				/>
				{errors.location && <span className='text-danger'> {errors.location} </span>}
			</div>
			{/* role: property owner of renter */}
			<div className='form-group mb-3'>
				<label htmlFor="usertype"> Role: </label>
				<div className='form-check'>
					<input
						type="radio"
						className='form-check-input'
						name='role'
						value='propertyOwner'
						onChange={handleInput}
						id='propertyOwner'
					/>
					<label className="form-check-label" htmlFor="propertyOwner">Property Owner</label>
				</div>
				<div className='form-check'>
					<input
						type="radio"
						className='form-check-input'
						name='role'
						value='renter'
						onChange={handleInput}
						id='renter'
					/>
					<label className="form-check-label" htmlFor="renter">Renter </label>
				</div>
				{errors.role && <span className='text-danger'> {errors.role} </span>}
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
