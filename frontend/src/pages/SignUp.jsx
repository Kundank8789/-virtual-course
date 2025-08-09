import React from 'react'

function SignUp() {
  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
        <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'></form>

        {/* left div */}

        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'></div>

        {/* right div */}

        
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'></div>
        
        </div>
  )
}

export default SignUp