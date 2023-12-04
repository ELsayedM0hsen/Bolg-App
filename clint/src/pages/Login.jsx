import axios from "axios";
import { useState } from "react"
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [_, setCookies] = useCookies(["jwtoken"]);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login",{
            email,
            password
            });
            setCookies("jwtoken", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/myblogs")

        } catch (error) {
            console.log(error);
        }

    }


  return (
    <div>
        <div className="w-full flex justify-center items-center h-[80vh] ">
            <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                <h1 className="text-xl font-bold text-left">Log in to your account</h1>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
                <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">LogIn</button>
                <div className="flex justify-center items-center space-x-3">
                    <p>New here?</p>
                    <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login