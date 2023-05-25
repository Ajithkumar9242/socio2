import React, { useEffect } from 'react'
import { useSelector, useDispatch} from "react-redux"
import './Posts.css'
import Post from '../Post/Post'
import { getTimelinePost   } from '../../actions/postAction'
import { useParams } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'


const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePost(user._id));
  }, []);
  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
      { loading
        ? <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts