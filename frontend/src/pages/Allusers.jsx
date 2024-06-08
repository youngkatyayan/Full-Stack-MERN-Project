import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import Layouts from '../components/Layouts/Layouts';
import AdminMenu from '../components/admin/AdminMenu';

const Allusers = () => {
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
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

    // Calculate total pages
    const totalPages = Math.ceil(result.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Layouts>
                <div className='flex gap-2'>
                    <div className=''>
                        <AdminMenu />
                    </div>
                    <div className='w-full overflow-x-auto'>
                        <div className='mt-2 overflow-x-auto' style={{ boxShadow: '0 0 5px 2px #ddd' }}>
                            <table className='w-full userTable p-2'>
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Mobile No.</th>
                                        <th>Role</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{indexOfFirstItem + index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.username}</td>
                                                <td>{item?.email}</td>
                                                <td>{item?.pass}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.role}</td>
                                                <td className='w-16 h-12'><img src={item?.images} alt="" /></td>
                                                <td>
                                                    <button className='text-center mx-auto text-xl bg-green-100 p-2 rounded-full hover:bg-green-600 hover:text-white' style={{ boxShadow: '1px 1px 5px 2px #ddd' }}>
                                                        <MdModeEdit />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {/* Pagination Controls */}
                        </div>
                            <div className='flex justify-end mt-4 mr-12'>
                                <button 
                                    onClick={() => paginate(currentPage - 1)} 
                                    disabled={currentPage === 1}
                                    className='px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50'
                                >
                                    Prev
                                </button>
                                {
                                    Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => paginate(index + 1)}
                                            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))
                                }
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
            </Layouts>
        </>
    );
};

export default Allusers;
