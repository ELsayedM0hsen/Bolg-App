import React from 'react'
import HomePost from '../components/HomePost'

const Home = () => {
  return (
    <div className="px-8 md:px-[200px] min-h-[80vh]">
      <HomePost/>
      <HomePost/>
      <HomePost/>
      <HomePost/>
    </div>
  )
}

export default Home