import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from '../context/gitUserID.jsx'
import ProfilePosts from "../components/ProfilePosts";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["jwtoken"]);
  const navigate=useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts,setPosts]=useState([])
  const [updated,setUpdated]=useState(false)

  useEffect(() => {
      const userProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/user/${userID}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };
  userProfile()
  console.log("user is profilled");
  },[])

  useEffect(() => {
    const getUserPosts = async () => {
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
    getUserPosts();
    console.log("UserPosts are posted");
  }, []);


  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/user/${userID}`,
        { username, email, password },
        { headers: { authorization: cookies.jwtoken } }
      );
      console.log(res.data)
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/user/${userID}`, {
        headers: { authorization: cookies.jwtoken }
      });
      setUser(null);
      navigate("/");
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
              <h1 className="text-xl font-bold mb-4">Your posts:</h1>
              {posts?.map((p)=>(
                <ProfilePosts key={p._id} p={p}/>
              ))}
            </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className=" flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email"
              type="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your password"
              type="password"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                user updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
