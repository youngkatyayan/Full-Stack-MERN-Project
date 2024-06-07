import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminPage from '../components/admin/AdminPage';
// import { useSelector } from 'react-redux'
const Allusers = () => {
    const [result, setResult] = useState([])
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/gets-alldata')
            if (response.data.success) {
                setResult(response.data.result)
            }
            // console.log(response)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <div className='mt-2 overflow-x-auto' style={{ boxShadow: '0 0 5px 2px #ddd' }}>
                <table className='w-full userTable p-2' >
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
                            result.map((items, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{items?.name}</td>
                                    <td>{items?.username}</td>
                                    <td>{items?.email}</td>
                                    <td>{items?.pass}</td>
                                    <td>{items?.phone}</td>
                                    <td>{items?.role}</td>
                                    <td className='w-16 h-12'><img src={items?.images} alt="" /></td>
                                    <td>
                                        <button className='text-center mx-auto text-xl bg-green-100 p-2 rounded-full hover:bg-green-600 hover:text-white' style={{ boxShadow: '1px 1px 5px 2px #ddd' }}> <MdModeEdit /></button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Allusers