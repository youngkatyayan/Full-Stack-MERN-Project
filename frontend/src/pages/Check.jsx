import React, { useState } from 'react';
import signUp from '../../src/assest/signin.gif'
import Layouts from '../components/Layouts/Layouts.jsx';
import { imgBase64 } from './ImgBase64.jsx';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [images, setImgBaseString] = useState(null);
  const [data, setData] = useState({
    name: "",
    username: "",
    pass: "",
    phone: "",
    email: "",
    images: ""
  });
  const navigate = useNavigate();
  const handleRegisterForm = async (e) => {
    e.preventDefault();
    try {
      if (data.images == '') {
        toast.error('Image Required')
      }
      const fetchData = await axios.post('/api/v1/register', data);
      if (fetchData.data.success) {
        toast.success(fetchData.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
      else {
        toast.error('Registration failed')
      }
    } catch (error) {
      console.log("Something went wrong while fetching data", error.message);
    }
  };

  const handlePicture = async (e) => {
    const formPic = e.target.files[0];
    const file = await imgBase64(formPic);
    console.log()
    setData({ ...data, images:formPic.name });

    if (file) {
      setImgBaseString(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layouts>
      <Toaster />
      <div className='sm:w-[45%] lg:[35%] w-[20rem] h-full mx-auto border-2 p-8' style={{ boxShadow: '0 0 8px 2px #ddd' }}>
        <div className='w-24 h-24 mx-auto relative rounded-full overflow-hidden'>
          <img src={images || signUp} alt="Upload Image" />
          <form>
            <label>
              <div className='absolute text-center bottom-0 text-xs bg-white pb-3 pt-1 w-full bg-opacity-80 cursor-pointer'>
                Upload Photo
              </div>
              <input type="file" className='hidden' name='images' onChange={handlePicture} />
            </label>
          </form>
        </div>
        <form onSubmit={handleRegisterForm}>
          <h1 className='text-center text-2xl sm:text-4xl font-semibold my-8'>REGISTER FORM</h1>
          <div className='flex gap-3 border-b-2 mb-8'>
            <label htmlFor="" className='whitespace-nowrap'>Name :</label>
            <input type="text" name="name" value={data.name} onChange={handleChange} className='w-full outline-none' placeholder='Enter your name...' />
          </div>
          <div className='flex gap-3 border-b-2 mb-8'>
            <label htmlFor="" className='whitespace-nowrap'>Username :</label>
            <input type="text" name="username" value={data.username} onChange={handleChange} className='w-full outline-none' placeholder='Enter your username...' />
          </div>
          <div className='flex gap-3 border-b-2 mb-8'>
            <label htmlFor="" className='whitespace-nowrap'>Email :</label>
            <input type="email" name="email" value={data.email} onChange={handleChange} className='w-full outline-none' placeholder='Enter your email...' />
          </div>
          <div className='flex gap-3 border-b-2 mb-8'>
            <label htmlFor="" className='whitespace-nowrap'>Password :</label>
            <input type="password" name="pass" value={data.pass} onChange={handleChange} className='w-full outline-none' placeholder='Enter your password...' />
          </div>
          <div className='flex gap-3 border-b-2 mb-8'>
            <label htmlFor="" className='whitespace-nowrap'>Mobile No :</label>
            <input type="text" name="phone" value={data.phone} onChange={handleChange} className='w-full outline-none' placeholder='Enter your number...' />
          </div>
          <button className='bg-blue-700 py-2 px-3 text-white font-semibold rounded-lg ' style={{ textShadow: '1px 1px 1px #ddd', letterSpacing: '0.1rem' }} type='submit' >Submit</button>
        </form>
      </div>     
    </Layouts>
  );
};

export default SignUp;
