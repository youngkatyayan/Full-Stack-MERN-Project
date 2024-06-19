import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
import { sideItem } from '../common/index.jsx';
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
const AdminMenu = () => {
    const paths = [
        '/adminpage/allusers',
        '/adminpage/allproject',
    ];
    const [result, setResult] = useState([]);
    const logoImages = localStorage.getItem('images');
    const encodedImages = logoImages ? encodeURIComponent(logoImages) : '';
    const handleAdmin = async () => {
        try {
            const { data } = await axios.get(`/api/v1/getadmindata/${encodedImages}`);
            if (data.success) {
                setResult(data.result);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    };
    useEffect(() => {
        handleAdmin();
    }, []);
  
    return (
        <div className='sm:w-[19vw] w-[12rem] min-h-[calc(100vh-4rem)] hidden md:block bg-white animated-border' style={{ boxShadow: '3px 0px 5px 2px #ddd' }}>
            <div className='flex items-center justify-center mt-4 mb-5 '>
                {logoImages ? (
                    <img className='h-20 w-20 rounded-full border-x-2  combined-animated border-animated shadow-red-600 ' src={logoImages} alt="User" />
                ) : (
                    <FaRegUserCircle className='text-3xl' />
                )}
            </div>
            <div className='flex items-center justify-center flex-col gap-2'>
                <p className='text-xl text-black font-serif font-medium mt-3 username '>{result.length > 0 && result[0].name}</p>
                <p>{result.length > 0 && result[0].role}</p>

            </div>
            <div className=' flex flex-col gap-4 mt-5 mx-[2vw]'>
                {sideItem.map((item, index) => (
                    <Link to={paths[index]}  className='text-lg cursor-pointer hover:border-2 hover:rounded-full py-1 ps-3 hover:shadow-md hover:shadow-blue-400 hover:bg-blue-700 hover:text-white flex items-center gap-2 whitespace-nowrap' key={index}><p className='text-2xl'>{item.icon}</p>{item.name}</Link>
                ))}
            </div>
        </div>
    )
}
export default AdminMenu