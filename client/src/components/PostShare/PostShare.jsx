import React, { useState, useRef } from "react";
import {useSelector,  useDispatch } from "react-redux"

import "./PostShare.css";
// import { GiAscendingBlock } from "@iconscout/react-unicons";
// import { UilPlayCircle } from "@iconscout/react-unicons";
// import { UilLocationPoint } from "@iconscout/react-unicons";
// import { UilSchedule } from "@iconscout/react-unicons";
// import { UilTimes } from "@iconscout/react-unicons";
import { BiPhotoAlbum, BiVideo } from 'react-icons/bi';
import { AiOutlineHome, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { BiCurrentLocation } from 'react-icons/bi';
import { AiFillSchedule } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { IoIosShare } from 'react-icons/io';

// import { uploadImage } from "../../api/UploadRequest";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
import { Avatar, Button, Input, Spinner, Stack } from "@chakra-ui/react";


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
    
    dispatch(uploadPost(newPost))
  }

  resetShare()
}

const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };
  return (
    <div className="PostShare">
      <Avatar name={user.name}  src={user.profilePicture ? import.meta.env.VITE_SOME_VALUE + user.profilePicture : "https://www.shutterstock.com/image-vector/incognito-icon-browse-private-vector-600w-1359971813.jpg"} alt="" />

      <div>

        <Input placeholder="What's Happening?" size='md' ref={desc} required={true} />
        <>
          <Stack direction='row' spacing={4} align='center' onClick={()=>imageRef.current.click()}>
<Button colorScheme='green' leftIcon={<BiPhotoAlbum />} >
            Photo

  </Button>

  <Button colorScheme='teal' leftIcon={<AiOutlineVideoCameraAdd />} >
  Video


  </Button>

  <Button colorScheme='cyan' leftIcon={<BiCurrentLocation />} >
            Location

  </Button>

  <Button colorScheme='purple' leftIcon={<AiFillSchedule />} >
            Schedule

  </Button>

          </Stack>
             <Button colorScheme='purple' leftIcon={<IoIosShare />}
     onClick={handleSubmit}
          disabled={loading}

          >
            {loading ? <Spinner color='green.500' /> : "Share"}

  </Button>


          

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </>
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
