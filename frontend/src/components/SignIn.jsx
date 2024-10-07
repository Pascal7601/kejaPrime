import React from 'react';
import '../styles/SignIn.css';

const SignIn = () => {
  return (
	<div className='sign-in-container container mt-5 addUser'>
		<h2> Sign In</h2>
		<form className='addUserform'>
			<div className=' form-group mb-3 inputGroup'>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					className='form-control'
					id='name'
					autoComplete='off'
					placeholder='Enter your username'
				/>
			</div>
			<div className='form-group mb-3'>
				<label htmlFor="email"> Email:</label>
				<input
					type="text"
					id='email'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your email'
				/>
			</div>
			<div className='form-group mb-3'>
				<label htmlFor="password"> Password:</label>
				<input
					type="text"
					id='password'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your password'
				/>
			</div>
			<button type='submit' className='btn btn-primary'> Sign In</button>
		</form>
	</div>
  )
}

export default SignIn
