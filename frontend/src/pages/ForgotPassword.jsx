import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [step, setStep] = useState(3)
  const navigate = useNavigate()
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      {/* step 1 */}

     { step == 1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md
      w-full'>
      <h2 className='text-2xl font-bold mb-6 text-center text-geay-800'>Forgot your password</h2>
      <form className='space-y-4'>
        <div>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Enter Your Email Address</label>
          <input id='email' type='text' className='mt-1 w-full  px-4 py-2  bordeer border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-2 focus:ring-[black]' placeholder='you@exaple.com' required/>
        </div>
        <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2
         px-4 rounded-md font-medium cursor-pointer'>Send Otp</button>
      </form>
      <div className='text-sm text-center mt-4'onClick={() => navigate('/login')}>Back to Login</div>

     </div>}
     {/* step 2 */}

     { step == 2 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md
      w-full'>
      <h2 className='text-2xl font-bold mb-6 text-center text-geay-800'>Enter Otp</h2>
      <form className='space-y-4'>
        <div>
          <label htmlFor="Otp" className='block text-sm font-medium text-gray-700'>Please enter the 4-digit OTP sent to your email.</label>
          <input id='Otp' type='text' className='mt-1 w-full  px-4 py-2  bordeer border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-2 focus:ring-[black]' placeholder='* * * *' required/>
        </div>
        <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2
         px-4 rounded-md font-medium cursor-pointer'>Verify Otp</button>
      </form>
      <div className='text-sm text-center mt-4'onClick={() => navigate('/login')}>Back to Login</div>

    

     </div>}

      {/* step 3 */}
  
      { step == 3 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md
      w-full'>
      <h2 className='text-2xl font-bold mb-6 text-center text-geay-800'>Reset your password</h2>
      <p className='text-sm text-gray-500 text-center mb-6'>Enter a new Password below to regain access to Your Account.</p>
      <form className='space-y-4'>
        <div>
          <label htmlFor="Password" className='block text-sm font-medium text-gray-700'>New Password</label>
          <input id='Password' type='text' className='mt-1 w-full  px-4 py-2  bordeer border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-2 focus:ring-[black]' placeholder='******' required/>
        </div>
          <div>
          <label htmlFor="ConPassword" className='block text-sm font-medium text-gray-700'>Conform Password</label>
          <input id='ConPassword' type='text' className='mt-1 w-full  px-4 py-2  bordeer border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-2 focus:ring-[black]' placeholder='******' required/>
        </div>
        <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2
         px-4 rounded-md font-medium cursor-pointer'>Reset Password</button>
      </form>
      <div className='text-sm text-center mt-4'onClick={() => navigate('/login')}>Back to Login</div>
  
      </div>}
    </div>
  )
}

export default ForgotPassword