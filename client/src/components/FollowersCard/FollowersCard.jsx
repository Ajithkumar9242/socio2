import React, { useEffect, useState } from 'react'
import './FollowersCard.css'

import User from '../User/User'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../api/UserRequest'
import { Text } from '@chakra-ui/react'


const FollowersCard = () => {

    const [persons, setPersons] = useState([])
    const { user } = useSelector((state) => state.authReducer.authData);


    useEffect(() => {
      const fetchPerson = async() =>{
        const { data } = await getAllUser()
        setPersons(data)
  }
    fetchPerson()
    
    }, [])
    


  return (
    <div className="FollowersCard">
      <Text fontSize='xl'>People around you</Text>


        {persons. map((person, id)=>{
            if(person._id !== user._id){
            return(
              
                <User person = {person} key={id}/>
            )
            }
            
        })}
    </div>
  )
}

export default FollowersCard