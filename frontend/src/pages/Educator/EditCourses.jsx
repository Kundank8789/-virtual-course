import React from 'react'
import {FaArrowLeftLong} from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
function EditCourses() {
  const navigate = useNavigate();
  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      {/* top bar */}

      <div className='flex items-center justify-between gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        <FaArrowLeftLong className='top-[20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer ' onClick={()=>navigate("/courses")}/>
          <h2 className='text-2xl font-semibold mp:pl-[60px]'>Add detail information regading the course</h2>
          <div>
          <button></button>
          </div>

      </div>
      {/* form detail */}



      </div> 
  )
}

export default EditCourses