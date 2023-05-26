
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { FaUserEdit } from "react-icons/fa";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  // const theme = useMantineTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
   
    <>
      <Button onClick={onOpen}>
        <FaUserEdit />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
               value={formData.firstname}
             onChange={handleChange}
             name="firstname"
             placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                   value={formData.lastname}
             onChange={handleChange}
             name="lastname"
              placeholder='Last name' />
            </FormControl>


 <FormControl mt={4}>
              <FormLabel>Works At</FormLabel>
              <Input
                   value={formData.worksAt}
             onChange={handleChange}
             name="worksAt"
              placeholder='Works At' />
            </FormControl>


            
            
 <FormControl mt={4}>
              <FormLabel>Lives At</FormLabel>
              <Input
                   value={formData.livesIn}
             onChange={handleChange}
             name="livesIn"
              placeholder='Lives In' />
            </FormControl>

             <FormControl mt={4}>
              <FormLabel>Country</FormLabel>
              <Input
                   value={formData.country}
             onChange={handleChange}
             name="country"
              placeholder='Country' />
            </FormControl>

 <FormControl mt={4}>
              <FormLabel>Relationship status</FormLabel>
              <Input
                   value={formData.relationship}
             onChange={handleChange}
             name="relationship"
              placeholder='Relationship status' />
            </FormControl>





 <FormControl mt={4}>
              <FormLabel>Profile image</FormLabel>
              <Input
              type="file"
              name="profileImage"
        onChange={onImageChange} />
            </FormControl>


 <FormControl mt={4}>
              <FormLabel>Cover image</FormLabel>
              <Input
              type="file"
              name="coverImage"
        onChange={onImageChange} />
            </FormControl>



          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
