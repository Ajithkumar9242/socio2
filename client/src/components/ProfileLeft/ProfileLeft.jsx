import React, { useState } from 'react'
import ShareModal from "../ShareModal/ShareModal";
import { FiShare } from "react-icons/fi"
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import { Button } from '@chakra-ui/react';
const ProfileLeft = () => {
    const [modalOpened, setModalOpened] = useState(false);

  return (
   <div className="ProfileSide">
       <LogoSearch/>
       <InfoCard/>
       <Button colorScheme='teal' onClick={() => setModalOpened(true)} leftIcon={<FiShare />} >
         Share
       </Button>

      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
   </div>
  )
}

export default ProfileLeft