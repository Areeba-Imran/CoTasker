import { AuthContext } from '../context/auth'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Hypnosis from "react-cssfx-loading/lib/Hypnosis"

export default function ViewOffers() {

    const { user } = useContext(AuthContext)
    const [offers, setOffers] = useState('');

    useEffect(() => {
        if(user){
            axios.get(`/api/offer/offers-received/${user._id}`)
            .then(response =>{
                setOffers(response.data.offer)
            })
        }
    },[user])
  return (
    offers?
    <div className='browse-tasks-page'>
        <h2 className='text-center'>View Offers</h2>
      
        {offers.map(offer => {
          return(
            
              <div className='task-min-view' key={offer._id}>
               
                  <img className="createrImg" src={offer.tasker.imagePath} alt="Tasker's img"/>
               
                <div className='task-info-browser'>
                  <h5>{offer.task.title}</h5>
                  <p>{offer.tasker.name}</p>
                  <p><b>Offer:</b> {offer.offeredAmount}</p>
                </div>
                
              </div>
      
          )
          
        })}
      </div>
      : <div className='loadingIcon'>
          <Hypnosis />
      </div>
  )
}
