import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
// import CreatePostPage from './pages/CreatePost'
import Profile from './pages/Profile'
import MyBlogs from './pages/MyBlogs'
import PostDetails from './pages/PostDetails'
import { useGetUserID } from './context/gitUserID'


const App = () => {
  const userID = useGetUserID();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path={`/profile/${userID}`} element={<Profile />}/>
        <Route path={`/myblogs/${userID}`} element={<MyBlogs />}/>
        <Route path='/post/:postID' element={<PostDetails />}/>
        {/* <Route path='/Createpost' element={<CreatePostPage />}/> */}
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
