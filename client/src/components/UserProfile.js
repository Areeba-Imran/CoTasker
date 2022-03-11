import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { useParams, Link } from 'react-router-dom';
import Hypnosis from "react-cssfx-loading/lib/Hypnosis"

export default function UserProfile() {

    const {user} = useContext(AuthContext)
    const { id } = useParams()
    const [tasksArr, setTasksArr] = useState('');

    useEffect(() => {
        if(user){
            axios.get(`/api/user/${id}`)
          .then(response =>{
            setTasksArr(response.data.tasksByCreater)
          })
        }  
    },[])

    return (

        tasksArr?
        <div className='profilePage'>
            <img className="profilePageImg" src={user.imagePath} alt="user"/>
            <h4>{user.name}</h4>
            
            
        </div> : 
        <div className='loadingIcon'>
            <Hypnosis />
        </div>
        
    )
}
