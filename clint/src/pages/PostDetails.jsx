import { useNavigate, useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../context/gitUserID";
import { useCookies } from "react-cookie";

const PostDetails = () => {
  const userID = useGetUserID();
  const { postID } = useParams();
  const [cookies, _] = useCookies(["jwtoken"]);
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/post/${postID}`);
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
    console.log("post detial");
  }, [postID]);

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/post/${postID}`,
        { headers: { authorization: cookies.jwtoken } }
      );
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            {post.title}
          </h1>
          {/* {userID === post?.user?._id && ( */}
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
              >
                <BiEdit />
              </p>
              <p className="cursor-pointer" onClick={handleDeletePost}>
                <MdDelete />
              </p>
            </div>
          {/* )} */}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <img src={post.img} className="w-full  mx-auto mt-8" alt="" />
        <p className="mx-auto mt-8">{post.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            {post.categories?.map((c) => (
              <div key={c} className="bg-gray-300 rounded-lg px-3 py-1">
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
