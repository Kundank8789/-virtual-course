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
    </Routes>
    </>
  )
}

export default App