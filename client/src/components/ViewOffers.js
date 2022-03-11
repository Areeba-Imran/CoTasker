import { AuthContext } from '../context/auth'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'


export default function ViewOffers() {

    const { user } = useContext(AuthContext)

    useEffect(() => {
        if(user){
            axios.get(`/api/offer/offers-received/${user._id}`)
            .then(response =>{
                
            })
        }
    },[user])
  return (
    <div>ViewOffers</div>
  )
}
