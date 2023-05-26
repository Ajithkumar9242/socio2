import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/userAction'
import { Avatar, Button, Heading } from '@chakra-ui/react'
import {  SlUserFollow, SlUserFollowing } from 'react-icons/sl';

const User = ({person}) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id))

    const diapatch = useDispatch()
    

    const handleFollow = () =>{
        if(following){
        diapatch(unFollowUser(person._id, user))
        }else{
        diapatch(followUser(person._id, user))
        }

        setFollowing((prev) => !prev)
    }

  return (
    <>
        <div className="follower">
                    <div>
                        {/* <img src={person.img} alt="" className='followerImage' /> */}
                        {/* < name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /> */}
                      <Avatar name={person.firstname} src={person.profilePicture ? import.meta.env.VITE_SOME_VALUE + person.profilePicture : "https://www.shutterstock.com/image-vector/incognito-icon-browse-private-vector-600w-1359971813.jpg"} alt="" className='followerImage'/>

                        <div className="name">
                          <Heading size='sm'>{person.firstname}</Heading>
                          <Heading size='sm'>{person.username}</Heading>

                            {/* <span>{person.firstname}</span> */}
                            {/* <span>{person.username}</span> */}
                        </div>
                    </div>
                    <Button colorScheme='facebook'  onClick={handleFollow}>
                        { following ? <SlUserFollowing /> : <SlUserFollow />  }
                      
                    </Button>
        
                </div>
    </>
  )
}

export default User