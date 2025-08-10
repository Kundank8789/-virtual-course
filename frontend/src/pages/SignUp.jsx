import React from 'react'
import logo from "../assets/logo.jpg"
function SignUp() {
  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
        <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'>

        {/* left div */}

        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
            <div>
                <h1 className='font-semibold text-[black] text-2xl'>let's get started</h1>
                <h2 className='text-[#999797] text-[18px]'>create an account</h2>
            </div>
           
            <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                <label htmlFor="name" className='font-semibold'>Name</label>
                <input id='name' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'placeholder='your name'/>
            </div>
             <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                <input id='email' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'placeholder='your email'/>
            </div>
             <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                <label htmlFor="Password" className='font-semibold'>password</label>
                <input id='password' type="password" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'placeholder='your password'/>
            </div>
            <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
                <span className='px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-b-xl cursor-pointer hover:border-black'>Student</span>
                <span className='px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-b-xl cursor-pointer hover:border-black'>Educator</span>
            </div>
            <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]'>Sign Up</button>
            <div className='w-[80%] flex items-center gap-2'>
                <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue </div>
                <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
            </div>
            <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center'>
                <img src="" alt="" />
            </div>
        </div>

        {/* right div */}

        
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
            <img src={logo} alt="logo" className='w-30 shadow-2xl' />
            <span className='text-2xl text-white'>VIRTUAL COURSES</span>

        </div>
        
        </form>
        
        </div>
  )
}

export default SignUp