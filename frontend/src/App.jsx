import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
export const serverUrl = 'http://localhost:3000'
import { ToastContainer } from 'react-toastify'
import getCurrentUser from './customHooks/getCurrentUser.js'

function App() {
  getCurrentUser();
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App