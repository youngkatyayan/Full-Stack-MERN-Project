import React, { useState } from 'react'
import Layouts from '../components/Layouts/Layouts.jsx'
import AdminMenu from '../components/admin/AdminMenu.jsx'
import { UploadImage } from '../components/helpers/UploadImage.jsx';
import { RxCross2 } from "react-icons/rx";
import { category } from '../components/common/index.jsx';
import { MdCloudUpload } from "react-icons/md";
import axios from 'axios';
const AllProduct = () => {
    const [popUp, setPopUp] = useState(false)
    const [values, setValues] = useState({
        PName: '',
        BName: '',
        category: '',

    })
    const [productImage, setproductImage] = useState([])

    // handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault()
        const image = productImage.name
        try {

            const response = await axios.post('/api/v1/create-product', { values, image })
            console.log(response)
        } catch (error) {
            console.log('Error on submittion')
        }
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0]
        setproductImage(file.name)
        console.log('file', file)
        const uploadImageCloud = await UploadImage(file)
        console.log('uploadImageCloud', uploadImageCloud)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    return (
        <Layouts>
            <div className='min-h-[calc(80vh)] flex gap-5'>
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
                            <div className='w-full px-8 py-2 overflow-y-scroll '>
                                <form action="" onSubmit={handleSubmit}>

                                    <div className='my-2'>
                                        <label htmlFor="productName" className='text-lg mb-1'>Product Name :
                                            <input type="text" name="PName" value={values.PName} onChange={handleChange}
                                                id="productName" className='border-2 w-full px-2 py-2 outline-none mt-1' placeholder='Enter your product name...' />
                                        </label>
                                    </div>

                                    <div className='my-5'>
                                        <label htmlFor="brandname" className='text-lg mb-1'>Brand Name :
                                            <input type="text" name="BName" id="brandname" onChange={handleChange} value={values.BName}
                                                className='border-2 w-full px-2 py-2 outline-none mt-1' placeholder='Enter your brand name...' />
                                        </label>
                                    </div>

                                    <div className='my-5'>
                                        <label htmlFor="categoryname" className='text-lg mb-1'>Category :
                                            <select name="category" id="" className='w-full border-2 px-2 py-2 mt-1 capitalize' value={values.category} onChange={handleChange}>
                                                <option value="">--Select Category --</option>
                                                {
                                                    category.map((items, index) => (
                                                        <option key={items.id} value={items.value} >{items.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </label>
                                    </div>

                                    <div className='my-5'>
                                        <label htmlFor="productImage" className='text-lg'>
                                            Product Image:
                                            <div className='w-full border-2 h-48 mt-1 rounded flex flex-col justify-center items-center bg-slate-100 cursor-pointer'>
                                                <MdCloudUpload className='text-5xl' />
                                                <p>Upload Product Image</p>
                                                <input
                                                    type="file"
                                                    name="productImage"
                                                    id="productImage"
                                                    className='hidden'
                                                    onChange={handleUploadImage}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    {
                                        <div className='w-full overflow-x-scroll py-2 px-2 flex  gap-2'>
                                            <img src="" alt="Images" />
                                        </div>
                                    }
                                    <button type='submit' className='w-full mt-1 border py-1 font-semibold bg-red-700 text-white rounded'>Upload</button>
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