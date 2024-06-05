import React, { useState } from 'react'
import Layouts from '../components/Layouts/Layouts.jsx'
import imgLogo from '../../src/assest/421c311d41b38789175b1ca6648dd216.png'
import { Link } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa"
import { BiShow } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
const ForgetPassword = () => {
  const [username, setUserName] = useState('')
  const [nPass, setNpass] = useState('')
  const [cPass, setCpass] = useState('')
  const [showcPass, setShowcPass] = useState(false)
  const handleForgetForm = async (e) => {
    e.preventDefault()
    try {
      if (cPass === nPass) {
        const fetchData = await axios.put('/api/v1/forget-password', { username, pass: cPass })
        if (fetchData.data.success) {
          toast.success(fetchData.data.message)
        }
      } 
      else {
        toast.error('Confirm password does not match new password')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleForm = () => {
    setShowcPass((prev) => !prev)
  }
  return (
    <Layouts>
      <Toaster />
      <div className='sm:w-[90%] h-[85vh] flex justify-center items-center sm:mx-auto  bg-zinc-300 '>
        <div className='sm:w-[80%] w-[95%]  h-[70vh]' style={{ background: "#ddd" }}>
          <div className='sm:w-[100%] w-[95%] h-[25vh] bg-yellow-400 relative flex justify-center '>
            <div className='w-[95%] px-5 sm:px-10 sm:w-[30rem]  border h-[58vh] absolute top-14 bg-white rounded-2xl mx-2'
              style={{ boxShadow: '0 0 5px 1px white' }}>

              <div className='flex items-center justify-center mt-4'>
                <img src={imgLogo} alt="" />
              </div>
              <h1 className='text-center my-2 text-2xl font-bold font-serif'>Forget Password</h1>

              <p className=' text-[gray] text-center'
                style={{ fontFamily: 'Roboto,sans-serif', fontSize: '0.9rem' }}>Enter your Username and change your password successfully </p>
              <form className='py-5' action="" onSubmit={handleForgetForm}>

                <div className='border-b-2 pb-1 flex items-center gap-2  mb-5'>
                  <label className='hidden sm:flex text-md '
                    style={{ fontFamily: 'sans-serif', fontSize: '1rem' }} htmlFor="">Username :
                  </label>
                  <input type="text" name="" id=""
                    value={username}
                    onChange={(e) => { setUserName(e.target.value) }}
                    className='outline-none sm:px-2 '
                    style={{ fontFamily: 'sans-serif', fontSize: '1rem' }}
                    placeholder='Enter your username...' />
                </div>

                <div className='border-b-2 pb-1 flex items-center gap-2 mb-5'>
                  <label className='hidden sm:flex whitespace-nowrap text-md  '
                    style={{ fontFamily: 'sans-serif', fontSize: '1rem' }} htmlFor="">New Password :
                  </label>
                  <input type="text" name="" id="" className='outline-none sm:px-2 '
                    value={nPass} onChange={(e) => setNpass(e.target.value)}
                    style={{ fontFamily: 'sans-serif', fontSize: '1rem' }}
                    placeholder='Enter new password...' />
                </div>

                <div className='border-b-2 pb-1 flex items-center gap-2  mb-5'>
                  <label className='hidden sm:flex whitespace-nowrap'
                    style={{ fontFamily: 'sans-serif', fontSize: '1rem' }} htmlFor="">Current Password :
                  </label>
                  <input type={!showcPass ? "password" : "text"} name="" id="" className='outline-none sm:px-2'
                    value={cPass} onChange={(e) => { setCpass(e.target.value) }}
                    style={{ fontFamily: 'sans-serif', fontSize: '1rem' }}
                    placeholder='Enter current password...' />
                  <div className='text-xl' onClick={handleForm}>
                    {
                      showcPass ? (<BiShow />) : (<FaEyeSlash />)
                    }
                  </div>
                </div>

                <button type='submit' className='w-full h-7 bg-yellow-400 text-white font-semibold'>Submit</button>

              </form>
              <div className='flex items-center justify-center'>
                <MdKeyboardArrowLeft className='text-xl' />
                <p>Back to
                  <Link to={'/login'} className='underline text-blue-600'> login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>

  )
}

export default ForgetPassword