import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import logo from '../../assest/images.png'
import { Link } from 'react-router-dom';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../store/userSlice.jsx';
const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const logoImages = localStorage.getItem('images')
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.user?.user);
  // console.log(user)
  const handleClick = async () => {
    try {
      const fetchData = await axios.get('/api/v1/logout')
      if (fetchData.data.success) {
        localStorage.removeItem('images');
        toast.success(fetchData.data.message)
        dispatch(setUserDetails(null))
        window.location.href = '/'
      }
      else {
        toast.success("error")
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  // const userImage = user[0]?.images ? user[0].images : null;

  return (
    <>
      <div className='h-16 px-5 sm:px-10 shadow-lg '>
        <Toaster />
        <div className=' mx-auto container flex items-center justify-between '>
          <div className='flex items-center  no-wrap ' >
            <img className='h-16 w-36' src={logo} alt="Logo" />
          </div>

          <div className='hidden md:flex'>
            <label htmlFor="" className='h-7 w-[15rem]  flex max-w-sm items-center justify-between pr-2 rounded-full bg-red-600 focus-within:shadow-lg'>
              <input type="search" className=' rounded-s-lg  px-2 pb-1 outline-none ' placeholder='search product here...' />
              <IoIosSearch className='font-mono text-xl' />
            </label>
          </div>

          <div className='flex items-center justify-between gap-3 sm:gap-7'>
            <div className='' >
              {logoImages ? (<img className='h-10 w-10 rounded-full' onClick={() => setShowMenu(prev => !prev)} src={logoImages} alt="User" />) : (
                <FaRegUserCircle className='text-3xl' />
              )}
            </div>
            {
              showMenu ? (<div className='absolute top-[4rem] bg-slate-100 rounded-lg box' style={{ boxShadow: '' }}>
                <Link to={'/adminpage'} className='text-[1.2rem] hover:bg-[#ddd] hover:rounded-xl   py-1 px-[2.5rem] whitespace-nowrap hover:-tracking-tighter' style={{ textShadow: '1px 1px 1px' }} >Admin Panel</Link>
              </div>
              ) : ''
            }

            <div className=' relative flex'>
              <FaShoppingCart className='text-xl' />

              <div className='bg-red-600 flex items-center justify-center absolute -top-2 left-2 w-4 h-4 rounded-full'>
                <p className='text-xs'>0</p>
              </div>
            </div>

            <div >
              {user ? (
                <Link onClick={handleClick} className='flex justify-center items-center bg-red-600 px-3 text-white pb-1 rounded-2xl hover:bg-red-500'>Logout</Link>
              ) : (
                <Link to={'/login'} className='flex justify-center items-center bg-red-600 px-3 text-white pb-1 rounded-2xl hover:bg-red-500' >Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header