import React, { useState } from 'react'
import Layouts from '../components/Layouts/Layouts.jsx'
import AdminMenu from '../components/admin/AdminMenu.jsx'
import { RxCross2 } from "react-icons/rx";

const AllProduct = () => {
    const [popUp, setPopUp] = useState(false)

    return (
        <Layouts>
            <div className='min-h-[calc(100vh-4rem)] flex gap-5'>
                <div className=''>
                    <AdminMenu />
                </div>
                <div className='w-full overflow-x-auto bg-gray-50 mt-2 mx-auto px-2 relative'>
                    <div className='flex  items-center justify-between py-1'>
                        <p className='text-xl font-semibold'>All Products</p>
                        <p className='px-4 py-1 border-2 border-red-600 hover:font-semibold rounded-full hover:bg-red-700 hover:text-white cursor-pointer' onClick={() => setPopUp(prev => !prev)} >Upload Product</p>
                    </div>
                    {
                        popUp &&
                        <div className='mx-auto w-[75%]  min-h-[calc(100vh-5.2rem)] border-2 z-10 absolute top-2 bg-white left-28'>
                            <div className='flex items-center justify-between px-3 py-2 bg-white shadow-md'>
                                <p className='text-xl font-semibold'>Upload Product</p>
                                <RxCross2 className='text-xl' onClick={() => setPopUp(false)} />
                            </div>
                            <div className='w-full px-8 py-2 '>
                                <form action="">
                                    <div className='my-2'> 
                                        <label htmlFor="productName" className='text-lg mb-1'>Product Name :
                                            <input type="text" name="" id="productName" className='border-2 w-full px-2 py-2 outline-none mt-1' placeholder='Enter your product name...' />
                                        </label>
                                    </div>
                                    <div className='my-5'>
                                        <label htmlFor="brandname" className='text-lg mb-1'>Brand Name :
                                            <input type="text" name="" id="brandname" className='border-2 w-full px-2 py-2 outline-none mt-1' placeholder='Enter your brand name...' />
                                        </label>
                                    </div>
                                    <div className='my-5'>
                                        <label htmlFor="categoryname" className='text-lg mb-1'>Category :
                                            <select name="" id="" className='w-full border-2 px-2 py-2 mt-1'>
                                                <option value="">--Select Category --</option>
                                            </select>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Layouts>
    )
}

export default AllProduct