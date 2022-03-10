import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function PostTask() {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Custom');
    const [budget, setBudget] = useState('');
    const [openToOffers, setOpenToOffers] = useState(false);
    const [location, setLocation] = useState('')
    const [imagePath, setImagePath] = useState('');
    const [creater, setCreater] = useState('');
    const [tasker, setTasker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [submitDisabled, setSubmitDisabled] = React.useState(false);
    const [checkedDisabled, setCheckedDisabled] = useState(false);

    const handleTitle= (e) => setTitle(e.target.value)
    const handleDescription= (e) => setDescription(e.target.value)
    const handleCategory= (e) => setCategory(e.target.value)
    const handleOffers= (e) => setOpenToOffers(e.target.checked)
    const handleLocation= (e) => setLocation(e.target.value)
    const handleBudget= (e) => {
        if(e.target.value){
            setOpenToOffers(false)
            setCheckedDisabled(true)
        }
        else setCheckedDisabled(false)
        setBudget(e.target.value)
    }
    
    useEffect((()=>{
        if(user){
            setCreater(user._id)
        }
    }),[user])

    const handleImageUpload= (e) => {
        
        setSubmitDisabled(true)
        console.log('disable true: ' + new Date().toLocaleString())
        const uploadData = new FormData();
        uploadData.append("imagePath", e.target.files[0]);

        axios.post('/api/task/image-upload', uploadData)
            .then(response =>{
                setSubmitDisabled(false)
                console.log('disable false: ' + new Date().toLocaleString())
                setImagePath(response.data.imagePathCloudinary)
                console.log('uploder: ' +imagePath)
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    }


    const handleForm = (e) =>{
        e.preventDefault()

        if(creater){

        const requestBody = {title, description, category, budget, openToOffers, location, imagePath, creater, tasker}

        axios.post('/api/task/add', requestBody)
			.then((response) => {
                //console.log(response)
                setTitle("")
                setDescription("")
                setCategory('Custom')
                setBudget(0)
                setOpenToOffers(false)
                setLocation("")
                setImagePath("")
				navigate('/browse-tasks')
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			}) 
        }
    }

    return (
        <div className='post-task-page'>
            
            <form onSubmit={handleForm} encType="multipart/form-data" className='task-form'>
                <h2 className='postTaskHeading'>Post a Task</h2>
                <div className='mb-3'>
                    <label htmlFor='taskTitle' className="form-label">Task Title</label>
                    <small id="titleMinChars" className="form-text">Min. 10 characters</small>
                    <input id='taskTitle' type="text" value={title} onChange={handleTitle} className='form-control' required minLength="10"/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='taskDesc' className="form-label">Task Description</label>
                    <small id="descMinChars" className="form-text">Min. 25 characters</small>
                    <textarea id='taskDesc' value={description} onChange={handleDescription} className='form-control' minLength="25" rows="7"/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='taskCategory' className="form-label">Category</label>
                    <select id='taskCategory' name="category" value={category} onChange={handleCategory} className='form-control'>
                        <option value="Custom">Custom</option>
                        <option value="Handy Person">Handy Person</option>
                        <option value="Transport">Transport</option>
                        <option value="Painting">Painting</option>
                        <option value="Translation">Translation</option>
                        <option value="Pet Sitting">Pet Sitting</option>
                        <option value="Cooking">Cooking</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label htmlFor='taskBudget' className="form-label">Budget</label>
                    <input id='taskBudget' type="Number" value={budget} min="1" onChange={handleBudget} className='form-control' placeholder="0" required={openToOffers? false: true}/>
                </div>
                <div className='mb-3 form-check'>
                    <input id='taskOffer' type="checkbox" checked={openToOffers} disabled={checkedDisabled} className='form-check-input' onChange={handleOffers}/>
                    <label htmlFor='taskOffer' className="form-check-label">Open To Offers</label>
                </div>
                <div className='mb-3'>
                <label htmlFor='taskLocation' className="form-label">Location</label>
                    <input id='taskLocation' type="text" value={location} onChange={handleLocation} className='form-control' required/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='formFile' className="form-label">Upload Images</label>
                    <input id='formFile' type="file" onChange={handleImageUpload} className='form-control' name="taskImg"/>
                </div>
                <button type='submit' disabled={submitDisabled} className="btn btn-primary taskPostBtn">Post</button>
            </form>

            {errorMessage && <h5>{errorMessage}</h5>}
        </div>
    )
}
