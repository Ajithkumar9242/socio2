import React, { useEffect, useState } from "react";
import "./InfoCard.css";
// import { UilPen } from "@iconscout/react-unicons";
import { FaUserEdit } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import * as UserApi from "../../api/UserRequest"

import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { logOut } from "../../actions/AuthAction";
import { Button } from "@chakra-ui/react";

const InfoCard = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts)

  const handleLogOut = ()=> {
    dispatch(logOut())
  }


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            {/* <FaUserEdit
            style={{ cursor: "pointer"}}
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            /> */}
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data = {user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        {/* */}
        <span>
          <b>Status: </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in : </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at: </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      <div className="info">
        <span>
          <b>Posts: </b>
        </span>
        <span>{posts.filter((post) => post.userId === user._id).length}</span>
      </div>
<Button colorScheme='red' onClick={handleLogOut} leftIcon={<CiLogout />}>Log Out</Button>
<Button colorScheme='facebook' leftIcon={<AiOutlineHome />} >
  <Link to={"/home"}>
    Home
  </Link>
  </Button>
    </div>
  );
};

export default InfoCard;