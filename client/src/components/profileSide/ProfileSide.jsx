import React, { useState } from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'
import "./ProfileSide.css"
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <ProfileCard  location = {"homepage"}/>
             <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  )
}

export default ProfileSide