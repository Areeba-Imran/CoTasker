import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import homeImg from './images/home-img.png'

export default function Login() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate()

	const { storeToken, verifyStoredToken } = useContext(AuthContext)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }
		axios.post('/api/auth/login', requestBody)
			.then(response => {
				console.log('i have a token yay')
				const token = response.data.authToken
				storeToken(token)
				verifyStoredToken()
					.then(() => {
						navigate('/browse-tasks')
					})
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	return (
		<div className='auth-page'>
			<img src={homeImg} alt="home" className='homeImg'/>
			<div className="auth-form-panel">
			<h3>Login</h3>
			<form onSubmit={handleSubmit} className='auth-form'>
				<label htmlFor="email">Email: </label>
				<input type="text" value={email} onChange={handleEmail} />
				<label htmlFor="password">Password: </label>
				<input type="password" value={password} onChange={handlePassword} />
				<button type="submit">Log In</button>
			</form>

			{errorMessage && <h5>{errorMessage}</h5>}

			<h4>Don't have an account?</h4>
			<Link to='/signup'>Signup</Link>
			</div>
		</div>
	)
}