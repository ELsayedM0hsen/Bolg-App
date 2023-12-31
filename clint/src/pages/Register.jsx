import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-[80vh] ">
      <form className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
        <h1 className="text-xl font-bold text-left">Create an account</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border-2 border-black outline-0"
          type="text"
          placeholder="Enter your username"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border-2 border-black outline-0"
          type="text"
          placeholder="Enter your email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border-2 border-black outline-0"
          type="password"
          placeholder="Enter your password"
        />
        <button
          onClick={handleRegister}
          className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
        >
          Register
        </button>
        <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p>
          <p className="text-gray-500 hover:text-black">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
