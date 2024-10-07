import React from 'react'
import '../styles/SignUp.css'

const SignUp = () => {
  return (
	<div className='sign-up-container container mt-5 addUser'>
		<h2> Sign Up</h2>
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
			<button type='submit' className='btn btn-primary'> Sign Up</button>
		</form>
		<div className='login'>
			<p>Already have an account ?</p>
			<button type='submit' className='btn btn-success'> Sign In</button>
		</div>
	</div>
  )
}

export default SignUp
