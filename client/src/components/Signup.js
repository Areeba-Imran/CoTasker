import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import homeImg from './images/home-img.png'

export default function Signup() {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [imagePath, setImagePath] = useState('https://res.cloudinary.com/areebaimran46/image/upload/v1646748322/Co%20Tasker/18958255_pn2qba.jpg');
	const [submitDisabled, setSubmitDisabled] = React.useState(false);

	const handleEmail = e => setEmail(e.target.value)
	const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate()

	const handleImageUpload= (e) => {

		setSubmitDisabled(true)
        const uploadData = new FormData();
        uploadData.append("imagePath", e.target.files[0]);

        axios.post('/api/task/image-upload', uploadData)
            .then(response =>{
				setSubmitDisabled(false)
                setImagePath(response.data.imagePathCloudinary)
				console.log('inside uploader fn: ' + imagePath)
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    }

	const handleSubmit = e => {
		e.preventDefault()

		const requestBody = { email, password, name, imagePath }
		axios.post('/api/auth/signup', requestBody)
			.then(response => {
				// redirect to login
				navigate('/login')
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	return (
		<div className='auth-page'>
			<img src={homeImg} alt="home" className='homeImg'/>
			<div className="auth-form-panel">
				<h3>Signup</h3>
				<form onSubmit={handleSubmit} className='auth-form' encType="multipart/form-data">
					<label htmlFor="email">Email: </label>
					<input type="text" value={email} onChange={handleEmail} />
					<label htmlFor="password">Password: </label>
					<input type="password" value={password} onChange={handlePassword} />
					<label htmlFor="name">Name: </label>
					<input type="text" value={name} onChange={handleName} />
					<label>Set Profile Picture:</label>
                	<input type="file" onChange={handleImageUpload} name="taskImg"/>

					<button type="submit" disabled={submitDisabled}>Sign Up</button>
				</form>

				{errorMessage && <h5>{errorMessage}</h5>}

				<h4>Already have an account?</h4>
				<Link to='/login'>Login</Link>
			</div>
		</div>
	)
}
