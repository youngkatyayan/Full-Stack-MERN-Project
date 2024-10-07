import React, { useState } from 'react';
import signUp from '../../src/assest/signin.gif';
import Layouts from '../components/Layouts/Layouts.jsx';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [images, setImages] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    username: "",
    pass: "",
    phone: "",
    email: ""
  });

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    if (!images) {
      toast.error('Image Required');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('pass', data.pass);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('images', images); 
    try {
      const fetchData = await axios.post('/api/v1/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (fetchData.data.success) {
        toast.success(fetchData.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        toast.error(fetchData.data.message || 'Registration failed');
      }
    } catch (error) {
      console.log("Error during registration", error.message);
    }
  };

  const handlePicture = (e) => {
    const formPic = e.target.files[0];
    setImages(formPic); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layouts>
      <Toaster />
      <div className='sm:w-[45%] lg:w-[35%] w-[20rem] h-full mx-auto border-2 p-8' style={{ boxShadow: '0 0 8px 2px #ddd' }}>
        <div className='w-24 h-24 mx-auto relative rounded-full overflow-hidden'>
          <img src={images ? URL.createObjectURL(images) : signUp} alt="Upload Image" />
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
          <h1 className='text-center text-2xl sm:text-4xl font-semibold my-8' style={{ textShadow: '2px 2px 2px ' }}>REGISTER FORM</h1>
          <input type="text" name="name" value={data.name} onChange={handleChange} placeholder='Enter your name...' className='w-full outline-none mb-8' />
          <input type="text" name="username" value={data.username} onChange={handleChange} placeholder='Enter your username...' className='w-full outline-none mb-8' />
          <input type="email" name="email" value={data.email} onChange={handleChange} placeholder='Enter your email...' className='w-full outline-none mb-8' />
          <input type="password" name="pass" value={data.pass} onChange={handleChange} placeholder='Enter your password...' className='w-full outline-none mb-8' />
          <input type="text" name="phone" value={data.phone} onChange={handleChange} placeholder='Enter your phone number...' className='w-full outline-none mb-8' />
          <button type='submit' className='bg-blue-700 py-2 px-3 text-white font-semibold rounded-lg'>Submit</button>
        </form>
      </div>
    </Layouts>
  );
};

export default SignUp;
