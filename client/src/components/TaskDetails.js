import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth'

export default function TaskDetails() {

    const { user } = useContext(AuthContext)
    const [taskDetails, setTaskDetails] = useState('');
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/api/task/${id}`)
          .then(response =>{
            setTaskDetails(response.data.task)
          })
        },[])

    return (
        taskDetails?
        <div className="taskDetailsPage">
            <h4 className='taskDetailsHeading'>TaskDetails</h4>

            <Link to={`/edit-task/${taskDetails._id}`}>
                <button className='btn taskEditBtn' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"><i className="bi bi-pencil-square"></i></button>
            </Link>
                <button className='btn taskDeleteBtn' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete"><i className="bi bi-trash-fill"></i></button>
            
            
            <div>
                <h5>{taskDetails.title}</h5>
                <p>{taskDetails.description}</p>
            </div>

            <div>
                <p className='detail-page-headings'>This task needs to be done on</p>
                <p><i className="bi bi-calendar-date"></i> ASAP</p>
            </div>

            <div>
                <p className='detail-page-headings'>Task Location</p>
                <p><i className="bi bi-geo-alt"></i> {taskDetails.location}</p>
            </div>

            <div>
                <p className='detail-page-headings'>{taskDetails.imagePath && `Task images`}</p>
                {taskDetails.imagePath? <img src={taskDetails.imagePath} alt="task" className="taskImg"/> : ''}  
            </div>

            <div>
                <p className='detail-page-headings'>Task Posted By</p>
                <img src={taskDetails.creater.imagePath} className="navbar-profile-icon" alt="person who created this task"/>
                <p>{taskDetails.creater.name}</p>
            </div>

            <div className='makeAnOffer'>
                {taskDetails.openToOffers && <p className='detail-page-headings'>Open To Offers</p>}
                {taskDetails.budget && <p className='budget-task-details'><b>{taskDetails.budget} €</b></p>}
                {taskDetails.budget && <p>Estimated Price</p>}

                {taskDetails.creater._id === user._id ? '' : 
                <Link to={`/make-offer/${taskDetails._id}`}>
                    <button className='btn btn-primary'>Make an offer</button>
                </Link>}

            </div>
        </div>: ''
    )
}
