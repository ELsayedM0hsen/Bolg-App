import React from 'react'
import { useGetUserID } from '../context/gitUserID.JS'
import axios from "axios";
import { useCookies } from "react-cookie";


const CreatePost = () => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
  return (
    <div>

    </div>
  )
}

export default CreatePost