import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth'
import Hypnosis from "react-cssfx-loading/lib/Hypnosis"

export default function TaskDetails() {

    const { user } = useContext(AuthContext)
    const [taskDetails, setTaskDetails] = useState('');
    const { id } = useParams()
    const navigate = useNavigate()

    const [offeredAmount, setOfferedAmount] = useState('');
    const [tasker, setTasker] = useState('');
    const [alreadyRequested, setAlreadyRequested] = useState('')

    useEffect(() => {
        axios.get(`/api/task/${id}`)
          .then(response =>{
            setTaskDetails(response.data.task)
            axios.get(`/api/offer/${id}/${user._id}`)
                .then(response =>{
                    setAlreadyRequested(response.data.alreadyRequested)
                })
          })
    },[])

    useEffect(()=>{
        if(user){
            setTasker(user._id)
        }
    },[user])

    const deleteTask = () =>{
        axios.delete(`/api/task/${id}`)
            .then(response => {
           
                console.log(response)
                navigate(`/user-profile/${user._id}`)
            })
    }

    const handleOfferedAmount = (e) =>{
        setOfferedAmount(e.target.value)
    }

    const sendOffer = (e) =>{
        e.preventDefault()

        const reqBody = {tasker, task: id, offeredAmount, offerAccepted: false}

        if(offeredAmount){
            axios.post('/api/offer', reqBody)
                .then(() => {
                    navigate('/browse-tasks')
                })
        }
    }

    return (
        taskDetails?
        <div className="taskDetailsPage">
            <h2 className='taskDetailsHeading'>TaskDetails</h2>

            {taskDetails.creater._id === user._id &&
                <>
                    <Link to={`/edit-task/${taskDetails._id}`}>
                        <button className='btn taskEditBtn' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"><i className="bi bi-pencil-square"></i></button>
                    </Link>
                    <button onClick={deleteTask} className='btn taskDeleteBtn' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete"><i className="bi bi-trash-fill"></i></button>
                </>
            }

            {alreadyRequested && <p className='offerPending'>Offer Pending</p>}
            <div className='detail-section'>
                <h5>{taskDetails.title}</h5>
                <p>{taskDetails.description}</p>
            </div>

            <div className='detail-section'>
                <p className='detail-page-headings'>This task needs to be done on</p>
                <p><i className="bi bi-calendar-date"></i> ASAP</p>
            </div>

            <div className='detail-section'>
                <p className='detail-page-headings'>Task Location</p>
                <p><i className="bi bi-geo-alt"></i> {taskDetails.location}</p>
            </div>

            {taskDetails.imagePath &&
                <div className='detail-section'>
                    <p className='detail-page-headings'>Task images</p>
                    <img src={taskDetails.imagePath} alt="task" className="taskImg"/>
                </div>
            }        
            <div className='detail-section'>
                <p className='detail-page-headings'>Task Posted By</p>
                <img src={taskDetails.creater.imagePath} className="navbar-profile-icon" alt="person who created this task"/>
                <p>{taskDetails.creater.name}</p>
            </div>

            <div className='makeAnOffer detail-section'>
                {taskDetails.openToOffers && <p className='detail-page-headings'>Open To Offers</p>}
                {taskDetails.budget && <p className='budget-task-details'><b>{taskDetails.budget} €</b></p>}
                {taskDetails.budget && <p>Estimated Price</p>}
      
                {taskDetails.creater._id === user._id || alreadyRequested ? '' : 
                
                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Make an offer</button>
                }
            </div>

            {/* Modal Code below */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header modal-ends">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Make an Offer</h5>
                        </div>
                        <form onSubmit={sendOffer}>
                            <div className="modal-body">
                                <div className='input-group'>
                                    <span className="input-group-text">€</span>
                                    <input type="number" value={offeredAmount} onChange={handleOfferedAmount} placeholder={taskDetails.budget? taskDetails.budget : ''} className='form-control' required/>
                                </div>
                            </div>
                            <div className="modal-footer modal-ends">
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Modalcode ends */}

        </div> : 
        <div className='loadingIcon'>
            <Hypnosis />
        </div>
    )
}
