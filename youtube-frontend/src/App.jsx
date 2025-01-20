import { useState, useEffect } from 'react';
import Navbar from './Component/Navbar/Navbar.jsx';
import Home from './Pages/Home/Home.jsx';
import {Route, Routes} from 'react-router-dom';
import Video from './Pages/Video/Video.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import VideoUpload from './Pages/VideoUpload/VideoUpload.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import axios from 'axios';


function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchResults, setSearchResults] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(()=>{
    axios.get("http://localhost:4000/api/allVideo").then(res=>{console.log(res)}).catch(err=>{console.log(err)});
  },[])
  
  const setSideNavbarFunc  = (value) => {
    setSideNavbar(value)
  }

  return (
    <>
      <div className="p-0 m-0 box-border">
        <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} setSearchResults={setSearchResults} searchResults={searchResults} setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
        <Routes>
          <Route path="/" element={<Home sideNavbar={sideNavbar} searchResults={searchResults} searchQuery={searchQuery}/>} />
          <Route path="/watch/:id" element={<Video />} />
          <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar} />} />
          <Route path="/:id/upload" element={<VideoUpload />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        </div>
    </>
  )
}

export default App
