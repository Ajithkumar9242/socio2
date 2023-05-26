

import { React , useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useToast } from '@chakra-ui/react'
import { login } from '../../actions/AuthAction';
import { useDispatch } from 'react-redux';


const Login = () => {
    
  const toast = useToast()
  const dispatch = useDispatch();


  const [loading, setLoading] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
    const navigateTo = useNavigate()


const submitHandler = async () =>{
  setLoading(true)
  if(!username || !password) {
    toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false)
      return
  }

  try {
 
    const data  = {
          username, password
        }
        toast({
        title: "Login Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(login(data));

      localStorage.setItem("userInfo" , JSON.stringify(data))
        setLoading(false)
        navigateTo("/")


  } catch (error) {
    toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false)
        console.log(error);
  }
}
  return (
    <div>
        <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>User Name</FormLabel>
              <Input type="text" onChange={(e) => setUsername(e.target.value)}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <Stack spacing={10}>
     
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                  
                }}
                onClick = { submitHandler }
                isLoading = { loading }
                >
                Sign in
              </Button>
            </Stack>
            <Stack spacing={10}>
              <Text align={'center'}>
                Dont have an account? <Link color={'blue.400'} href='/signup'> Sign Up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </div>
  )
}

export default Login