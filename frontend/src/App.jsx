import React from 'react'
import { Routes, Route ,  } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
export const serverUrl = 'http://localhost:3000'
import { ToastContainer } from 'react-toastify'
import getCurrentUser from './customHooks/getCurrentUser.js'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import { Navigate } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Dashboard from './pages/Educator/Dashboard.jsx'
import CreateCourses from './pages/Educator/CreateCourses.jsx'


function App() {
  getCurrentUser();
  const {userData} = useSelector(state=>state.user)
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/signup" element={!userData ? <SignUp/> : <Navigate to ={"/"}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={userData ? <Profile/> :<Navigate to ={"/signup"}/>} />
       <Route path='/forgot-password' element={ <ForgotPassword/>} />
       <Route path='/editprofile' element={userData ? <EditProfile/> : <Navigate to={"/signup"}/>} />
       <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard/> : <Navigate to ={"/signup"}/>} />
        <Route path='/createcourse' element={userData?.role === "educator" ? <CreateCourses/> : <Navigate to ={"/signup"}/>} />
    </Routes>
    </>
  )
}

export default App