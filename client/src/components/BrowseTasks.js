import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Hypnosis from "react-cssfx-loading/lib/Hypnosis"

export default function BrowseTasks() {

  const [tasksArr, setTasksArr] = useState('');

  useEffect(() => {
    axios.get('/api/task')
      .then(response =>{
        setTasksArr(response.data.tasks)
      })
    },[])

    return(

      tasksArr? 
      
      <div className='browse-tasks-page'>
        <h2 className='text-center'>Browse Tasks</h2>
      
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