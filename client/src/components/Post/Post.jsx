import React, { useState } from 'react'
import './Post.css'
// import Comment from '../../img/comment.png'
// import Share from '../../img/share.png'
// import Heart from '../../img/like.png'
// import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostREquest'
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
// import {BsThreeDotsVertical} from "react-icons/bs"
import { BiLike , BiChat , BiShare } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  
  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev-1) : setLikes((prev) => prev+1)
  };
  return (
    // <div className="Post">
    //   <img
    //      src={data.image ? import.meta.env.VITE_SOME_VALUE + data.image : ""}
    //     alt=""
    //   />

    //   <div className="postReact">
    //     <img
    //       src={liked ? Heart : NotLike}
    //       alt=""
    //       style={{ cursor: "pointer" }}
    //       onClick={handleLike}
    //     />
    //     <img src={Comment} alt="" />
    //     <img src={Share} alt="" />
    //   </div>

    //   <span style={{ color: "var(--gray)", fontSize: "12px" }}>
    //     {likes} likes
    //   </span>
    //   <div className="detail">
    //     <span>
    //       <b>{data.name} </b>
    //     </span>
    //     <span>{data.desc}</span>
    //   </div>
    // </div>
    <Card maxW='md'>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        {/* here also */}
        {/* <Avatar name={user.name} src={user.profilePicture ? import.meta.env.VITE_SOME_VALUE + user.profilePicture  : "https://www.shutterstock.com/image-vector/incognito-icon-browse-private-vector-600w-1359971813.jpg"} /> */}

        <Box>
          {/* //here change the profile pic */}
          {/* //here change the profile pic */}
          {/* <Heading size='sm'>{user.username}</Heading> */}
          {/* <Text>Creator, Chakra UI</Text> */}
        </Box>
      </Flex>
      <IconButton
        variant='ghost'
        colorScheme='gray'
        aria-label='See menu'
    
      />
    </Flex>
  </CardHeader>
  <CardBody>
    <Text>
     {data.desc}
    </Text>
  </CardBody>
  <Image
    objectFit='cover'
    src={ import.meta.env.VITE_SOME_VALUE + data.image}
    alt='Chakra UI'
  />

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >

    <Button flex='1' variant='ghost' leftIcon={liked? <AiFillLike /> :<BiLike />} onClick={handleLike}>
      Like
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
      Comment
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
      Share
    </Button>
    {likes} likes

  </CardFooter>
</Card>
  );
};

export default Post