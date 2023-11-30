import React from 'react'
import { Link } from 'react-router-dom'
import { TfiSearch } from "react-icons/tfi";


const Navbar = () => {
    const user =false
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>
        <div className='flex justify-center items-center space-x-0'>
            <p><TfiSearch/></p>
            <input className='outline-none px-3 py-1' type="text" placeholder='Search for a post' />
        </div>
        {user?<h3><Link to="/write">Write</Link></h3> :<h3><Link to="/login">Login</Link></h3>}
        {user?<h3><Link to="/profile">profile</Link></h3> :<h3><Link to="/register">Register</Link></h3>}
    </div>
  )
}

export default Navbar