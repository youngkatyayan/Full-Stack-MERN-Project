import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
import Header from '../Layouts/Header.jsx';
import { sideItem } from '../common/index.jsx';
import Allusers from '../../pages/Allusers.jsx';
// import Allusers from '../../pages/Allusers.jsx';
const AdminPage = () => {
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
        <>

            <div className='min-h-[calc(100vh-4rem)] flex gap-5'>
                <div className='sm:w-[21vw] w-[12rem] min-h-[calc(100vh-4rem)] bg-white animated-border' style={{ boxShadow: '3px 0px 5px 2px #ddd' }}>
                    <div className='flex items-center justify-center mt-4 mb-3'>
                        {logoImages ? (
                            <img className='h-20 w-20 rounded-full' src={logoImages} alt="User" />
                        ) : (
                            <FaRegUserCircle className='text-3xl' />
                        )}
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2'>
                        <p className='text-xl text-black font-serif font-medium mt-3'>{result.length > 0 && result[0].name}</p>
                        <p>{result.length > 0 && result[0].role}</p>

                    </div>
                    <div className=' flex flex-col gap-3 mt-5 mx-[2vw]'>
                        {sideItem.map((item, index) => (
                            <p className='text-lg cursor-pointer hover:shadow-md ' key={index}>{item.name}</p>
                        ))}
                    </div>
                </div>
                <div className=''>
                    <Allusers />
                </div>
            </div>
        </>
    );
};

export default AdminPage;
