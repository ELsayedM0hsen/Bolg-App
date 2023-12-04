import { useState,useEffect } from 'react'
import HomePost from '../components/HomePost'
// import { useGetUserID } from '../context/gitUserID.JS';
import axios from 'axios';

const Home = () => {
  // const userId = useGetUserID();
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const getPosts = async()=>{
      try {
        const res = await axios.get("http://localhost:8000/api/post/",);
        console.log(res.data);
        setPosts(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
    console.log("post is posted");
  },[])
  return (
    <div className="px-8 md:px-[200px] min-h-[80vh]">
      {posts.map((post) => (
        <HomePost key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Home