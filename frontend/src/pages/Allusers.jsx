import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import Layouts from '../components/Layouts/Layouts';
import AdminMenu from '../components/admin/AdminMenu';
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from 'react-hot-toast'
import moment from 'moment';
const Allusers = () => {
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [updatePage, setUpdatePage] = useState(false);
    const [updated, setUpdated] = useState({
        id: '',
        name: '',
        username: '',
        pass: '',               //this is not required actually
        phone: '',
        role: ''
    });
    const itemsPerPage = 8;
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/gets-alldata');
            if (response.data.success) {
                setResult(response.data.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdated({
            ...updated,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Id = updated.id;
        try {
            const response = await axios.put(`/api/v1/update-data/${Id}`, updated);
            if (response.data.success) {
                setUpdatePage(false);
                fetchData();
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while updating the user");
        }
    };

    const totalPages = Math.ceil(result.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const updateHandle = (value) => {
        setUpdatePage(true);
        setUpdated(value);
    };

    return (
        <Layouts>
            <Toaster />
            <div className='min-h-[calc(100vh-4rem)] flex gap-5'>
                <div>
                    <AdminMenu />
                </div>
                <div className='w-full overflow-x-auto relative'>
                    <div className={`mt-2 overflow-x-auto ${updatePage && 'popupBack'}`} style={{ boxShadow: '0 0 5px 2px #ddd' }}>
                        <table className='w-full userTable p-2'>
                            <thead>
                                <tr className='bg-black text-white px-2'>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Mobile No.</th>
                                    <th>Role</th>
                                    <th>Image</th>
                                    <td>Time</td>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.username}</td>
                                            <td>{item?.email}</td>
                                            <td>{item?.pass}</td>
                                            <td>{item?.phone}</td>
                                            <td>{item?.role}</td>
                                            <td>{moment(item.created_at).format('LL')}</td>
                                            <td className='w-16 h-12'><img src={item?.images} alt="" /></td>
                                            <td>
                                                <button onClick={() => updateHandle(item)} className='text-center mx-auto text-xl bg-green-100 p-2 rounded-full hover:bg-green-600 hover:text-white hover:border-2 hover:shadow-md hover:shadow-green-600'>
                                                    <MdModeEdit />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className='text-center'>No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className='flex  items-center justify-between'>
                        <p className='text-blue-600 cursor-pointer'>Get Print</p>
                            <div className='flex justify-end my-2 mr-12'>
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className='px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50'
                                >
                                    Prev
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-full`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className='px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50'
                                >
                                    Next
                                </button>
                            </div>
                           
                        </div>
                    </div>

                    {updatePage && (
                        <div className='w-[32rem] bg-white absolute border-2 rounded-md popup p-8'>
                            <span onClick={() => setUpdatePage(false)} className='font-semibold absolute right-4 text-xl top-4'><RxCross2 /></span>
                            <form onSubmit={handleSubmit}>
                                <div className='flex items-center justify-between'>
                                    <input type="text" value={updated.name} name="name" onChange={handleChange} placeholder='Name' className='border-b-2 outline-none' />
                                    <input type="text" value={updated.username} name="username" onChange={handleChange} placeholder='Username' className='border-b-2 outline-none' />
                                </div>
                                <div className='flex items-center justify-between mt-8'>
                                    <input type="text" name="phone" value={updated.phone} onChange={handleChange} placeholder='Mobile No.' className='border-b-2 outline-none' />
                                    <input type="text" name="pass" value={updated.pass} onChange={handleChange} placeholder='Password' className='border-b-2 outline-none' />
                                </div>
                                <div className='flex items-center justify-between mt-5'>
                                    <button type='submit' className='shadow-xl bg-gray-300 text-teal-50 font-semibold px-2 py-1 mt-5 rounded-full hover:bg-blue-700'>Update</button>
                                    <select name="role" value={updated.role || ''} onChange={handleChange} className='w-44 border-gray-300 shadow-md py-1 rounded-full outline-none px-1'>
                                        <option value=""></option>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="GENERAL">GENERAL</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Layouts>
    );
};

export default Allusers;
