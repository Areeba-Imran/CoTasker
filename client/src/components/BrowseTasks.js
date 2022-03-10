import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
        <h2>Browse Tasks</h2>
      
        {tasksArr.map(task => {
          return(
            <Link to={`/task-details/${task._id}`} key={task._id}>
              <div className='task-min-view'>
                
                <h5>{task.title}</h5>
                <img className="createrImg" src={task.creater.imagePath} alt="Task Poster's img"/>
                <p className='offers-browser-page'>
                  {task.openToOffers? 'Open To Offers' : task.budget + '€'}
                </p>
                <p><i className="bi bi-calendar-date"></i> ASAP</p>
                <p><i className="bi bi-geo-alt-fill"></i> {task.location}</p>
                <p><i className="bi bi-tag-fill"></i> {task.category}</p>
              </div>
            </Link>
          )
          
        })}
      </div>
      : ''
      
    )
  }