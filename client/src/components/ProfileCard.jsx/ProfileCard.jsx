// import React from "react";
// import Cover from "../../img/cover.jpg";
// import Profile from "../../img/profileImg.jpg";
// import "./ProfileCard.css";
// import { useSelector } from 'react-redux'
// 


// const ProfileCard = ({location}) => {
  
//   const { user } = useSelector((state) => state.authReducer.authData)

//   const posts = useSelector((state) => state.postReducer.posts)


//   return (
//     <div className="ProfileCard">
//       <div className="ProfileImages">
//         <img src={user.coverPicture ? import.meta.env.VITE_SOME_VALUE + user.coverPicture : "https://images.unsplash.com/photo-1683085809775-d9ac53fcbe21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80"} alt="" />
//         <img src={user.profilePicture ? import.meta.env.VITE_SOME_VALUE + user.profilePicture : "https://www.shutterstock.com/image-vector/incognito-icon-browse-private-vector-600w-1359971813.jpg"} alt="" />

//       </div>

//       <div className="ProfileName">
//         <span>{user.firstname} {user.lastname}</span>
//         <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
//       </div>

//       <div className="followStatus">
//         <hr />
//         <div>
//           <div className="follow">
//             <span>{user.following.length}</span>
//             <span>Following</span>
//           </div>
//           <div className="vl"></div>
//           <div className="follow">
//             <span>{user.followers.length}</span>
//             <span>Followers</span>
//           </div>

//           {location === "profilePage" && (
//             <>
//               <div className="vl"></div>
//               <div className="follow">
//                 <span>{posts.filter((post) => post.userId === user._id).length}</span>
//                 <span>Posts</span>
//               </div>
//             </>
//           )}
//         </div>
//         <hr />
//       </div>
//       {location === "profilePage" ? "" : <span>
//         <Link style={{ textDecoration: "none" , color : "inherit"}} to={`/profile/${user._id}`}>
//         My Profile
//          </Link>
//         </span>}

//     </div>
//   );
// };

// export default ProfileCard;


import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,

} from '@chakra-ui/react';
import{ Link } from "react-router-dom"
import { useSelector } from 'react-redux';

export default function ProfileCard({location}) {
  const { user } = useSelector((state) => state.authReducer.authData)
  const posts = useSelector((state) => state.postReducer.posts)
  return (
    <Center py={6}>
      <Box
        minW={'20em'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
          user.coverPicture ?  import.meta.env.VITE_SOME_VALUE + user.coverPicture : "https://images.unsplash.com/photo-1683085809775-d9ac53fcbe21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80"
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              user.profilePicture ? import.meta.env.VITE_SOME_VALUE + user.profilePicture : "https://www.shutterstock.com/image-vector/incognito-icon-browse-private-vector-600w-1359971813.jpg"}
            
            alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {user.firstname} {user.lastname}
            </Heading>
            <Text color={'gray.500'}>{user.worksAt ? user.worksAt : "Write about yourself"}</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{user.followers.length}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{user.following.length}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Following
              </Text>
            </Stack>
          </Stack>

          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
           <Link style={{ textDecoration: "none" , color : "inherit"}} to={`/profile/${user._id}`}>
          My Profile
         </Link>
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
