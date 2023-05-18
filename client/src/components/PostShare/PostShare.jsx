import React, { useState, useRef } from "react";
import {useSelector,  useDispatch } from "react-redux"
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
// import { GiAscendingBlock } from "@iconscout/react-unicons";
// import { UilPlayCircle } from "@iconscout/react-unicons";
// import { UilLocationPoint } from "@iconscout/react-unicons";
// import { UilSchedule } from "@iconscout/react-unicons";
// import { UilTimes } from "@iconscout/react-unicons";
import { BiPhotoAlbum } from 'react-icons/bi';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { BiCurrentLocation } from 'react-icons/bi';
import { AiFillSchedule } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
// import { uploadImage } from "../../api/UploadRequest";
import { uploadImage, uploadPost } from "../../actions/uploadAction";


const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData)

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };



const handleSubmit = (e) =>{
  e.preventDefault()

  const newPost = {
    userId: user._id,
    desc: desc.current.value
  }
  if(image){
    const data = new FormData()
    const fileName = Date.now() + image.name
    data.append("name" , fileName)
    data.append("file", image)
    newPost.image = fileName

    try {
      dispatch(uploadImage(data))
    } catch (error) {
      console.log(error)
    }

  }

  dispatch(uploadPost(newPost))
  resetShare()
}

const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };
  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="" />
      <div>
        <input type="text" placeholder="What's happening" ref={desc} required/>
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <BiPhotoAlbum />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <AiOutlineVideoCameraAdd />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <BiCurrentLocation />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <AiFillSchedule />
            Shedule
          </div>
          <button className="button ps-button"
          onClick={handleSubmit}
          disabled={loading}
          >
            {loading ? "uploading" : "Share"}
            </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
      {image && (

        <div className="previewImage">
          <RxCross2 onClick={()=>setImage(null)}/>
          <img src={ URL.createObjectURL(image)} alt="" />
        </div>

      )}


      </div>
    </div>
  );
};

export default PostShare;
