import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { useParams, Link } from 'react-router-dom';

export default function UserProfile() {

    const {user} = useContext(AuthContext)
    const { id } = useParams()
    const [tasksArr, setTasksArr] = useState('');

    useEffect(() => {
        axios.get(`/api/user/${id}`)
          .then(response =>{
            setTasksArr(response.data.tasksByCreater)
          })
        },[])

    return (

        tasksArr?
        <div className='profilePage'>
            <img className="profilePageImg" src={user.imagePath} alt="user"/>
            <h4>{user.name}</h4>
            <h1>Posted Tasks</h1>
            {tasksArr.map(task =>{
                return(
                    <h3>{task.title}</h3>
                    )
                
            })}
        </div>: ''
        
    )
}
