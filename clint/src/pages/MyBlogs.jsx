import { useEffect, useState } from "react";
import HomePost from "../components/HomePost";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from '../context/gitUserID.jsx'

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [cookies, _] = useCookies(["jwtoken"]);
  const userID = useGetUserID();
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/post/user/${userID}`,{
            headers: { authorization: cookies.jwtoken }
        });
        console.log(res.data);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
    console.log("post is posted");
  }, []);

  return (
    <div className="px-8 md:px-[200px] min-h-[80vh]">
      {posts.map((post) => (
        <HomePost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default MyBlogs;
