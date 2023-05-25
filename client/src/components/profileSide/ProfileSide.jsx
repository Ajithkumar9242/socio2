import React, { useState } from 'react'

import ProfileCard from '../ProfileCard.jsx/ProfileCard'
import "./ProfileSide.css"
const ProfileSide = () => {
  return (
    <div className="ProfileSide">

        <ProfileCard  location = {"homepage"}/>
             
    </div>
  )
}

export default ProfileSide