import React, {useState} from 'react'
import '../styles/SignUp.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'; // Import axios
import Validation from '../LoginValidation.jsx';


const SignUp = () => {
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		location: '',
		contact: '',
		role:''   // new field for user type (property owner or renter)
	});
	const [errors, setErrors] = useState({});
	const navigate =useNavigate(); //hook to navigate to another route

	//handle input change
	const handleInput = (event) => {
			setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
	};
	//submit form; handle it as async
	const handleSubmit = async (event) => {
		console.log("Form submitted");
		event.preventDefault();
		const validationErrors = Validation(values);
    	setErrors(validationErrors);

		// only post if there are no validation errors
		try {
				console.log("Submitting form");
				const response = await axios.post('http://localhost:8000/api/v1/users/register', values); // Post to backend
				console.log(response.data);
				// alert('User registered successfully!');
				navigate('/sign-in'); // Redirect to sign-in page
		} catch (error) {
				console.error('There was an error registering the user:', error);
				// alert('Error registering user. Please try again.');
		}
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
					name='username'
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
			<div className='form-group mb-3'>
				<label htmlFor="contact"> Contact:</label>
				<input
					type="text"
					name='contact'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your contact'
					onChange={handleInput}
				/>
				{errors.contact && <span className='text-danger'> {errors.contact} </span>}
			</div>
			{/* role: landlord of renter */}
			<div className='form-group mb-3'>
				<label htmlFor="usertype"> Role: </label>
				<div className='form-check'>
					<input
						type="radio"
						className='form-check-input'
						name='role'
						value='landlord'
						onChange={handleInput}
						id='landlord'
					/>
					<label className="form-check-label" htmlFor="landlord">landlord</label>
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
					type="password"
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
