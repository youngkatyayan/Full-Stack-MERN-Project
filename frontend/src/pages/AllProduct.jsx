import React, { useEffect, useState } from 'react'
import Layouts from '../components/Layouts/Layouts.jsx'
import AdminMenu from '../components/admin/AdminMenu.jsx'
import { UploadImage } from '../components/helpers/UploadImage.jsx';
import { RxCross2 } from "react-icons/rx";
import { category } from '../components/common/index.jsx';
import { MdCloudUpload } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { MdModeEditOutline } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
const AllProduct = () => {
    const [imgPrev, setImgPrev] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [changeFun, setChangeFun] = useState(false)
    const [Id, setId] = useState('')
    const [allResult, setResult] = useState([])
    const [values, setValues] = useState({
        PName: '',
        BName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        Aprice:''
    })
    const [imageName, setImageName] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/v1/create-product', { ...values, imageName });
            if (response.data.success) {
                toast.success(response.data.message)
            }
            setPopUp(false)

        } catch (error) {
            console.log('Error on submission')
        }
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        setImageName((prev) =>
            [...prev, file.name.split('.')[0]]
        );
        const uploadImageCloud = await UploadImage(file);
        setValues((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageCloud.url]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handlePrev = (index) => {
        const imgs = values.productImage[index]
        setImgPrev(true)
        setImageName(imgs)
    }
    // useEffect(() => {
    //     handlePrev()
    // }, [])


    const handleDelete = async (index) => {
        const imgs = values.productImage

        setValues(prev => ({
            ...prev,
            productImage: prev.productImage.filter((_, i) => i !== index)
        }))
        if (imgPrev && index === imgs.findIndex(img => img === imageName)) {
            setImgPrev(false);
            setImageName('');
        }
    }

    const accessData = async () => {
        try {
            const { data } = await axios.get('/api/v1/getproduct-data')
            if (data.success) {
                setResult(data.result)

            }
        } catch (error) {
            alert('Something Error ')
        }
    }

    useEffect(() => {
        accessData()
    }, [])

    // handleEdit function
    const handleEdit = async (value) => {
        setPopUp(true)
        setChangeFun(true)
        setId(value.Id)
        setValues({
            PName: value.prname,
            BName: value.brname,
            category: value.category,
            productImage: JSON.parse(value.productImage),
            description: value.description,
            price: value.price
        })
    }

    // handle update function
    const handleUpgate = async () => {
        try {
            if (Id) {
                const { data } = await axios.put(`/api/v1/update-product/${Id}`, values)
                if (data.success) {
                    alert('ok')
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <Layouts>
            <Toaster />
            <div className='min-h-[calc(80vh)] flex gap-5 '>
                <div className=''>
                    <AdminMenu />
                </div>
                <div className='w-full bg-gray-50 mt-2 mx-auto px-2 relative'>
                    <div className='flex items-center shadow-md mb-2 justify-between py-1'>
                        <p className='text-xl font-semibold'>All Products</p>
                        <p className='px-4 py-1 border-2 border-red-600 hover:font-semibold rounded-full hover:bg-red-700 hover:text-white cursor-pointer' onClick={() => setPopUp(prev => !prev)} >Upload Product</p>
                    </div>

                    <div className='shadow-inner p-2 flex gap-5 border flex-wrap justify-center max-h-[87vh] overflow-scroll '>
                        {allResult && allResult.map((item, index) => {
                            const imagesArray = JSON.parse(item.productImage);
                            const names = JSON.parse(item.image_Name);

                            return (
                                <div key={index} className='flex gap-2 flex-wrap '>
                                    {imagesArray.map((image, imgIndex) => (

                                        <div key={imgIndex} className='w-40 shadow-slate-400 shadow-md relative '>

                                            <img width={180} height={160} className='object-contain w-full max-h-40' src={image} alt={`Product ${item.prname} ${imgIndex + 1}`} />

                                            <p className='line-clamp-2 text-[0.8rem] m-2  text-ellipsis'>
                                            { names[imgIndex] || [`Image ${imgIndex + 1}`]}


                                            </p>

                                            <p className='font-semibold flex items-center mb-1'>
                                                <MdCurrencyRupee />{item.price}
                                            </p>

                                            {allResult && (
                                                <button
                                                    className='absolute bottom-1 right-2 rounded-full shadow-md bg-green-300 p-2'
                                                    onClick={() => handleEdit(item)}
                                                    aria-label="Edit product"
                                                >
                                                    <MdModeEditOutline />
                                                </button>
                                            )}

                                        </div>

                                    ))}
                                </div>
                            );
                        })}
                    </div>
                    {/* print as row */}




                    {popUp && (
                        <div className={`mx-auto w-[75%] min-h-[calc(100vh-5.2rem)] border-2 z-10 absolute top-2 bg-white left-28 ${imgPrev && 'backdrop-filter backdrop-blur-[10px]'}`}>
                           
                            <div className='flex items-center justify-between px-3 py-2 bg-white shadow-md'>
                                <p className='text-xl font-semibold'>Upload Product</p>
                                <RxCross2 className='text-xl' onClick={() => setPopUp(false)} />
                            </div>

                            <div className='w-full px-8 py-2 overflow-y-scroll relative'>

                                <form action="" onSubmit={changeFun ? handleUpgate : handleSubmit}>
                                    <div className='my-2'>
                                        <label htmlFor="productName" className='text-lg mb-1'>Product Name:
                                            <input type="text" name="PName" value={values.PName} onChange={handleChange}
                                                id="productName" className='border-2 w-full px-2 py-2 outline-none mt-1' placeholder='Enter your product name...' />
                                        </label>
                                    </div>

                                    <div className='my-5'>
                                        <label htmlFor="brandname" className='text-lg mb-1'>Brand Name:
                                            <input type="text" name="BName" id="brandname" onChange={handleChange} value={values.BName}
                                                className='border-2 w-full px-2 py-2 outline-none mt-1' placeholder='Enter your brand name...' />
                                        </label>
                                    </div>

                                    <div className='my-5'>
                                        <label htmlFor="categoryname" className='text-lg mb-1'>Category:
                                            <select name="category" id="" className='w-full border-2 px-2 py-2 mt-1 capitalize' value={values.category} onChange={handleChange}>
                                                <option value="">--Select Category --</option>
                                                {category.map((items, index) => (
                                                    <option key={items.id} value={items.value}>{items.name}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>

                                    <div className='mt-5'>
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

                                    {values.productImage[0] ? (
                                        <div className='w-full overflow-x-scroll py-2 px-2 flex gap-2 mb-5 '>
                                            {values.productImage.map((items, index) => (
                                                <div key={index} className='relative'>
                                                    <img src={items} height={80} width={80} alt="Images" onClick={() => handlePrev(index)} />
                                                    <MdDelete className='absolute right-0 bottom-0 rounded-tl-md text-red-600 bg-white' onClick={() => { handleDelete(index) }} />
                                                </div>

                                            ))}
                                        </div>
                                    ) : (
                                        <p className='mb-5'>*Please upload product image</p>
                                    )}

                                    <div className='my-5'>
                                        <label htmlFor="description" className='text-lg mb-1'>Description:
                                            <input type="text" name="description" id="description" onChange={handleChange} value={values.description}
                                                className='border-2 w-full px-2 py-2 outline-none mt-1' placeholder='Enter your description...' />
                                        </label>
                                    </div>

                                    <div className='my-5'>
                                        <label htmlFor="price" className='text-lg mb-1'>Price:
                                            <input type="text" name="price" id="price" onChange={handleChange} value={values.price}
                                                className='border-2 w-full px-2 py-2 outline-none mt-1' placeholder='Enter your price...' />
                                        </label>
                                    </div>

                                    <div className='my-5'>
                                        <label htmlFor="Aprice" className='text-lg mb-1'>Actul Price:
                                            <input type="text" name="Aprice" id="Aprice" onChange={handleChange} value={values.Aprice}
                                                className='border-2 w-full px-2 py-2 outline-none mt-1' placeholder='Enter your price...' />
                                        </label>
                                    </div>

                                    <button type='submit' className='w-full mt-1 border py-1 font-semibold bg-red-700 text-white rounded'>{changeFun ? 'Save' : 'Upload'}</button>
                                </form>

                                {imgPrev && (
                                    <div className='w-[400px] h-[400px] absolute top-24 left-24'>
                                        <img src={imageName} className='object-cover' alt="Images" onClick={() => setImgPrev(false)} />
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layouts>
    )
}

export default AllProduct


{/* <button
              className='absolute bottom-1 right-2 rounded-full shadow-md bg-green-300 p-2'
              onClick={() => handleEdit(item)}
              aria-label="Edit product"
            >
              <MdModeEditOutline />
            </button> */}