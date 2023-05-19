import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import { useSelector } from 'react-redux'
import{ Link } from "react-router-dom"


const ProfileCard = ({location}) => {
  
  const { user } = useSelector((state) => state.authReducer.authData)

  const posts = useSelector((state) => state.postReducer.posts)


  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.coverPicture ? import.meta.env.VITE_SOME_VALUE + user.coverPicture : "https://images.unsplash.com/photo-1683085809775-d9ac53fcbe21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80"} alt="" />
        <img src={user.profilePicture ? import.meta.env.VITE_SOME_VALUE + user.profilePicture : "https://www.shutterstock.com/image-vector/incognito-icon-browse-private-vector-600w-1359971813.jpg"} alt="" />

      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post) => post.userId === user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? "" : <span>
        <Link style={{ textDecoration: "none" , color : "inherit"}} to={`/profile/${user._id}`}>
        My Profile
         </Link>
        </span>}

    </div>
  );
};

export default ProfileCard;
