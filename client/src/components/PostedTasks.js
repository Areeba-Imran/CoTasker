import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Hypnosis from "react-cssfx-loading/lib/Hypnosis"
import { AuthContext } from '../context/auth'


export default function PostedTasks() {

    const { user } = useContext(AuthContext)

    const [tasksArr, setTasksArr] = useState('');

    useEffect(() => {
        if(user){
            axios.get(`/api/task/posted-tasks/${user._id}`)
            .then(response =>{
                setTasksArr(response.data.tasks)
            })
        }
    },[user])

    return (

        tasksArr? 
      
      <div className='browse-tasks-page'>
        <h2 className='text-center'>Posted Tasks</h2>
      
        {tasksArr.map(task => {
          return(
            <Link to={`/task-details/${task._id}`} key={task._id} className="browser-link">
              <div className='task-min-view'>
               
                  <img className="createrImg" src={task.creater.imagePath} alt="Task Poster's img"/>
               
                <div className='task-info-browser'>
                  <h5>{task.title}</h5>
                  <p><i className="bi bi-calendar-date"></i> ASAP</p>
                  <p><i className="bi bi-geo-alt-fill"></i> {task.location}</p>
                  <p><i className="bi bi-tag-fill"></i> {task.category}</p>
                </div>
                
                  <p className='offers-browser-page text-center'>
                    {task.openToOffers? 'Open To Offers' : task.budget + '€'}
                  </p>
                
              </div>
            </Link>
          )
          
        })}
      </div>
      : <div className='loadingIcon'>
          <Hypnosis />
      </div>
    )
}
