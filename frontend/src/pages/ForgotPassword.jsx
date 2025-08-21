import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { serverUrl } from '../App'
import ClipLoader from 'react-spinners/ClipLoader'
function ForgotPassword() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // for step1
  const sendOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/sendotp",{email},{withCredentials: true})
      console.log(result.data)
      setLoading(false)
      setStep(2)
      toast.success(result.data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  // for step 2

  const verifyOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/verifyotp",{email, otp},{withCredentials: true})
      console.log(result.data)
      setLoading(false)
      setStep(3)
      toast.success(result.data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  // for step 3

  const resetPassword = async () => {
    setLoading(true)
    try {
      if(newPassword !== confirmPassword){
        return toast.error("Passwords do not match")
      }
      const result = await axios.post(serverUrl + "/api/auth/resetpassword",{email, password:newPassword},{withCredentials: true})
      console.log(result.data)
      setLoading(false)
      toast.success(result.data.message)
      navigate('/login')

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      {/* step 1 */}

     { step == 1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md
      w-full'>
      <h2 className='text-2xl font-bold mb-6 text-center text-geay-800'>Forgot your password</h2>
      <form className='space-y-4'onSubmit={(e)=>e.preventDefault()}>
        <div>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Enter Your Email Address</label>
          <input id='email' type='text' className='mt-1 w-full  px-4 py-2  bordeer border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-2 focus:ring-[black]' placeholder='you@exaple.com' required onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>
        <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2
         px-4 rounded-md font-medium cursor-pointer'disabled={loading} onClick={sendOtp}>{loading ? <ClipLoader size={30} color='white'/> : "Send Otp"}</button>
      </form>
      <div className='text-sm text-center mt-4'onClick={() => navigate('/login')}>Back to Login</div>

     </div>}
     {/* step 2 */}

     { step == 2 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md
      w-full'>
      <h2 className='text-2xl font-bold mb-6 text-center text-geay-800'>Enter Otp</h2>
      <form className='space-y-4' onSubmit={(e)=>e.preventDefault()}>
        <div>
          <label htmlFor="Otp" className='block text-sm font-medium text-gray-700'>Please enter the 4-digit OTP sent to your email.</label>
          <input id='Otp' type='text' className='mt-1 w-full  px-4 py-2  bordeer border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-2 focus:ring-[black]' placeholder='* * * *' required onChange={(e) => setOtp(e.target.value)} value={otp}/>
        </div>
        <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2
         px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={verifyOtp}>{loading ? <ClipLoader size={30} color='white'/> : "Verify Otp"}</button>
      </form>
      <div className='text-sm text-center mt-4'onClick={() => navigate('/login')}>Back to Login</div>

    

     </div>}

      {/* step 3 */}
  
      { step == 3 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md
      w-full'>
      <h2 className='text-2xl font-bold mb-6 text-center text-geay-800'>Reset your password</h2>
      <p className='text-sm text-gray-500 text-center mb-6'>Enter a new Password below to regain access to Your Account.</p>
      <form className='space-y-4'onSubmit={(e)=>e.preventDefault()}>
        <div>
          <label htmlFor="Password" className='block text-sm font-medium text-gray-700'>New Password</label>
          <input id='Password' type='text' className='mt-1 w-full  px-4 py-2  bordeer border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-2 focus:ring-[black]' placeholder='******' required onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
        </div>
          <div>
          <label htmlFor="ConPassword" className='block text-sm font-medium text-gray-700'>Conform Password</label>
          <input id='ConPassword' type='text' className='mt-1 w-full  px-4 py-2  bordeer border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-2 focus:ring-[black]' placeholder='******' required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
        </div>
        <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2
         px-4 rounded-md font-medium cursor-pointer'disabled={loading} onClick={resetPassword}>{loading ? <ClipLoader size={30} color='white'/> : "Reset Password"}</button>
      </form>
      <div className='text-sm text-center mt-4'onClick={() => navigate('/login')}>Back to Login</div>
  
      </div>}
    </div>
  )
}

export default ForgotPassword