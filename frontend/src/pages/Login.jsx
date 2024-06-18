import React, { useState } from 'react'
import Layout from '../components/Layouts/Layouts.jsx'
import LoginPic from '../assest/image_processing20210207-26033-74opqt.png'
import { Link } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa"
import { BiShow } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUserRole } from '../store/userSlice.jsx';
const Login = () => {
    const [showPass, setShowPass] = useState(false)
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const locaction = useLocation()
    const PassHandle = () => {
        setShowPass((prev) => !prev)
    }
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const fetData = await axios.post('/api/v1/login', { email, pass })
            if (fetData.data.success) {
                dispatch(setUserRole(fetData.data.result))
                const ximages = fetData.data.result[0].images
                localStorage.setItem('images', ximages);
                toast.success(fetData.data.message)
                setInterval(() => {
                    navigate('/')
                    window.location.href = '/'
                }, 1000)
            }
            else {
                toast.error("Wrong Password")
                localStorage.removeItem('images', ximages);

            }
        } catch (error) {
            toast.error("Invalid user")
        }
    }

    return (
        <Layout>
            <Toaster />
            <div className=' h-[90vh] sm:w-[93%] max-w-full mx-auto  bg-zinc-300  flex items-center justify-center rounded-xl border-none ' style={{ boxShadow: '0 0 8px 5px #ddd' }}>
                <div className='w-[20rem] sm:w-[23rem] h-[90vh] bg-yellow-500  absolute sm:left-[22vw]'>

                </div>
                <div className='h-[55%] w-48 bg-white absolute right-6 ' style={{ boxShadow: '1px 0 5px 2px white' }}></div>

                <div className='h-[70vh] sm:h-[70vh] w-[87%] bg-zinc-100  border-none flex items-center justify-center rounded-md' style={{ boxShadow: '0 0 2px 5px #ddd', zIndex: '999', background: '#ddd' }}>
                    <div className='sm:w-[85%] w-[95%] sm:h-[55vh] h-[45vh] bg-white rounded-sm flex items-center justify-around gap-2  '>

                        <div className='w-[20rem] sm:w-[23rem] h-72 ml-10 relative border-none hidden lg:flex'>
                            <img src={LoginPic} alt="" className=' absolute -top-[90px]  w-[20rem] sm:w-[23rem] h-[63vh]' />
                        </div>

                        <div className='lg:w-[25rem] md:w-[85%] w-[90%] border-2 h-[44vh] sm:w-[80%] mr-2 rounded-lg px-4 sm:px-9 py-8 sm:py-5'>

                            <div className=''>
                                <h1 className='text-3xl font-bold '>Login</h1>
                                <p className='text-gray-400 font-serif pt-1 text-sm  whitespace-nowrap' >Please fill your information bellow</p>

                                <form action="" onSubmit={submitForm}>
                                    <div className=' mt-4 sm:mt-5 md:flex gap-4 border-b-2 justify-center items-center md:mt-6'>
                                        <p className='text-gray-400 font-serif whitespace-nowrap hidden sm:flex' style={{ fontFamily: "Roboto, sans-serif" }} >EMAIL ID</p>
                                        <input type="email" required name="email" value={email} onChange={(e) => setemail(e.target.value)} id=""
                                            placeholder='abc@gmail.com'
                                            className='sm:ml-2 ml-2 pl-1 outline-none h-6 pb-1 w-full my-1 focus-within:border-none text-gray-400' />

                                    </div>

                                    <div className=' mt-8 sm:mt-5 flex gap-4 border-b-2 justify-center items-center md:mt-8'>
                                        <p className='text-gray-400 font-serif whitespace-nowrap hidden sm:flex'
                                            style={{ fontFamily: "Roboto, sans-serif" }} >PASSWORD</p>
                                        <input type={showPass ? 'text' : 'password'} required name="pass" value={pass}
                                            onChange={(e) => setpass(e.target.value)} id="" placeholder='******' className='sm:ml-2 ml-2 pl-1 outline-none h-6 pb-1 w-full my-1 focus-within:border-none text-gray-400 ' />
                                        <div className='text-xl flex items-end justify-end' onClick={PassHandle}>
                                            {showPass ? (<BiShow />) : (<FaEyeSlash />)}
                                        </div>
                                    </div>

                                    <div className=' flex items-center justify-between mt-2 flex-wrap'>
                                        <div className='flex gap-2 items-center justify-center'>

                                            <Link to={'/signup'} className='text-gray-400 font-sans text-sm hover:underline hover:text-blue-500 animate-bounce px-3 py-1 rounded-full' required style={{ fontFamily: "Roboto, sans-serif", fontWeight: '400', fontSize: '.9rem', boxShadow: '0 2px 2px 1px #ddd' }} >Sign up </Link>
                                        </div>
                                        <div className=''>
                                            <Link to={'/forget-password'} style={{ boxShadow: '0 2px 2px 1px #ddd' }} className='text-gray-400 font-sans hover:underline px-3 rounded-full py-1 hover:text-blue-500'>Forget Password ?</Link>
                                        </div>
                                    </div>

                                    <div className='w-full h-7 bg-yellow-500 flex items-center justify-center mt-5'>
                                        <button type='submit' className='text-white font-bold'>LOGIN</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login