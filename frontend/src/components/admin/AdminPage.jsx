import React, { useEffect, useState } from 'react'
import Header from '../Layouts/Header.jsx'
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';

const AdminPage = () => {
    const [result, setResult] = useState([])
    const logoImages = localStorage.getItem('images');
    const encodedImages = encodeURIComponent(logoImages);
    const images = encodedImages;
    const handleAdmin = async () => {
        try {
            const adminData = await axios.get(`/api/v1/getadmindata/${images}`);
            if (adminData.data.success) {
                setResult(adminData.data.result)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleAdmin();
    }, []);

    return (
        <>
            <Header />
            <div className='min-h-[calc(100vh-4rem)] flex '>
                <div className='sm:w-[21vw] w-[12rem] min-h-[calc(100vh-4rem)]  bg-white' style={{ boxShadow: '3px 0px 5px 2px #ddd' }}>
                    <div className='flex items-center justify-center mt-4 mb-3'>
                        {logoImages ? (
                            <img className='h-20 w-20 rounded-full' src={logoImages} alt="User" />
                        ) : (
                            <FaRegUserCircle className='text-3xl' />
                        )}
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2'>
                        <p className='text-xl text-black font-serif font-medium'>{result.length>0?(result[0].name):null}</p>
                        <p>{result.length>0?(result[0].role):null}</p>
                    </div>
                </div>
                <div className='w-full'>
                    <p>lhj</p>
                </div>
            </div>
        </>
    );
}

export default AdminPage;
