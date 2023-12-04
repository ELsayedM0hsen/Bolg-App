import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TfiSearch } from "react-icons/tfi";
import {FaBars} from 'react-icons/fa'
import Menu from './Menu';


const Navbar = () => {
    const user =true
    const[menu,setMenu]=useState(false)
    const showMenu = () =>{setMenu(!menu)};
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>
        <div className='flex justify-center items-center space-x-0'>
            <p><TfiSearch/></p>
            <input className='outline-none px-3 py-1' type="text" placeholder='Search for a post' />
        </div>
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
      {user? <h3><Link to="/write">Write</Link></h3> :<h3><Link to="/login">Login</Link></h3>}
      {user? <div onClick={showMenu}>
        <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
      </div>:<h3><Link to="/register">Register</Link></h3>}
    </div>
    <div onClick={showMenu} className="md:hidden text-lg">
      <p className="cursor-pointer relative"><FaBars/></p>
      {menu && <Menu/>}
    </div>
    </div>
  )
}

export default Navbar