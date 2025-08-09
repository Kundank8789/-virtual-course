import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Login />} />
    </Routes>
    </>
  )
}

export default App