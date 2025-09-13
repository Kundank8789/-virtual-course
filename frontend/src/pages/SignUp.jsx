import React, { useState } from 'react';
import logo from "../assets/logo.jpg";
import googleImg from "../assets/google.jpg";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../utils/firebase.js';

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // handle form submit (now receives event)
  const handleSignUp = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );

      // backend should return { success, message, user: {...} }
      dispatch(setUserData(result.data.user));
      setLoading(false);
      toast.success(result.data.message || 'Signup successful!');
      navigate('/login');
    } catch (error) {
      console.log("Signup error:", error.response?.data || error.message);
      setLoading(false);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const gName = response.user?.displayName;
      const gEmail = response.user?.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googleauth`,
        { name: gName, email: gEmail, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user));
      toast.success(result.data.message || 'Signup successful!');
      navigate('/');
    } catch (error) {
      console.log("Google signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Google signup failed");
    }
  };

  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
      <form
        className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'
        onSubmit={handleSignUp} // <-- now the form uses the handler
      >

        {/* left div */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
          <div>
            <h1 className='font-semibold text-[black] text-2xl'>let's get started</h1>
            <h2 className='text-[#999797] text-[18px]'>create an account</h2>
          </div>

          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input
              id='name'
              name='name'
              type="text"
              className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'
              placeholder='your name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input
              id='email'
              name='email'
              type="email"
              className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'
              placeholder='your email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
            <label htmlFor="password" className='font-semibold'>password</label>
            <input
              id='password'
              name='password'
              type={show ? "text" : "password"}
              className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'
              placeholder='your password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              minLength={6}
            />
            {show ? (
              <IoEye
                className='absolute top-[38px] right-[15px] w-[20px] h-[20px] cursor-pointer text-gray-500'
                onClick={() => setShow(prev => !prev)}
              />
            ) : (
              <IoEyeOutline
                className='absolute top-[38px] right-[15px] w-[20px] h-[20px] cursor-pointer text-gray-500'
                onClick={() => setShow(prev => !prev)}
              />
            )}
          </div>

          {/* role toggles: fixed template literal usage */}
          <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
            <span
              className={`px-[10px] py-[5px] border-[2px] rounded-b-xl cursor-pointer hover:border-black ${
                role === 'student' ? 'border-black' : 'border-[#646464]'
              }`}
              onClick={() => setRole('student')}
              role="button"
              aria-pressed={role === 'student'}
            >
              Student
            </span>

            <span
              className={`px-[10px] py-[5px] border-[2px] rounded-b-xl cursor-pointer hover:border-black ${
                role === 'educator' ? 'border-black' : 'border-[#646464]'
              }`}
              onClick={() => setRole('educator')}
              role="button"
              aria-pressed={role === 'educator'}
            >
              Educator
            </span>
          </div>

          {/* submit button uses type="submit" and proper loader props */}
          <button
            type="submit"
            className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]'
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
          </button>

          <div className='w-[80%] flex items-center gap-2'>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
            <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue </div>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          </div>

          <div
            className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer'
            onClick={googleSignUp}
          >
            <img src={googleImg} className='w-[25px]' alt="google" />
            <span className='text-[18px] text-gray-500 ml-2'>Continue with Google</span>
          </div>

          <div className='text-[#6f6f6f]'>
            already have an account ?
            <span className='underline underline-offset-1 text-[black] cursor-pointer' onClick={() => navigate("/login")}> Login</span>
          </div>
        </div>

        {/* right div */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
          <img src={logo} alt="logo" className='w-30 shadow-2xl' />
          <span className='text-2xl text-white'>VIRTUAL COURSES</span>
        </div>

      </form>
    </div>
  );
}

export default SignUp;
