import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import AddToCart from '../components/helpers/AddToCart.jsx'
const HorizontalCartProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const loadingList = new Array(6).fill(null)
    const [transform, setTransform] = useState(0)
    // console.log(data)
    const scrollElement = useRef()

    const getDataByCategory = async () => {

        try {
            if (category) {
                const { data } = await axios.post('/api/v1/get-category-product', { category }, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
                if (data.success) {
                    // alert('ok') 
                    setData(data.result)
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getDataByCategory()
    }, [])

    const previousImage = async () => {
        scrollElement.current.scrollLeft -= 300
    }
    const nextImage = async () => {
        scrollElement.current.scrollLeft += 300
    }

    return (
        <>
            <div className='bg-slate-100 my-5 px-8 py-5 relative '>
                <p className='text-2xl font-bold animated-text'>{heading}</p>

                <div className='absolute  w-full h-full justify-between flex items-center px-6 top-6 left-1'>
                    <span className='z-10 font-semibold h-5 w-5 flex justify-center items-center border-r shadow-md  bg-gray-200 rounded-full' onClick={previousImage}><FaAngleLeft /></span>
                    <span className=' z-10 font-semibold h-5 w-5 flex justify-center items-center border-r shadow-md bg-gray-200 rounded-full' onClick={nextImage}><FaAngleRight /></span>
                </div>

                <div className='flex gap-12 mt-4 cont transition-all' ref={scrollElement}>

                    {
                        loading ? (
                            loadingList.map(el => (
                                <div key={el} className='w-[35rem] h-[8.3rem] rounded-md border-2 shadow-md flex  bg-white animate-pulse' style={{ transform: `translateX(-${transform}px)` }}>

                                    <div className='h-full w-[8.5rem] object-fill rounded overflow-hidden shadow-md shadow-slate-300 bg-slate-300 animate-pulse'>
                                        {/* <img src={JSON.parse(url.productImage)} alt="" className='object-cover h-full w-full hover:scale-110 transition-all' /> */}
                                    </div>

                                    <div className='p-2 w-[10rem] flex flex-col gap-2 '>
                                        <p className=' text-ellipsis line-clamp-1 font-semibold animate-pulse py-1 bg-slate-200' ></p>
                                        <p className='capitalize text-balance text-sm text-[#5b5959] animate-pulse py-1 bg-slate-200'></p>

                                        <div className=' flex items-center gap-2 text-sm animate-pulse'>
                                            <p className='flex items-center font-semibold bg-slate-100'> </p>
                                            <strike className='flex items-center '><pre className=' '></pre></strike>
                                        </div>
                                        <Link to={''} className=' hover:bg-white border-2 hover:text-black hover:tracking-wider hover:font-semibold bg-slate-200 px-2 rounded-full text-center animate-pulse font-semibold text-white py-1 text-sm'></Link>

                                    </div>
                                </div>
                            ))
                        )
                            : (
                                data && data.map((url, index) => {
                                    const imageArray = JSON.parse(url.productImage)
                                    const name = JSON.parse(url.image_Name)
                                    return (
                                        <Link to={`/product/` + url.Id} key={url.category + 1 + index} className='w-[35rem] max-h-[8.3rem] rounded-md border-2 shadow-md flex  bg-white' style={{ transform: `translateX(-${transform}px)` }}>

                                            <div className='h-full w-[8.5rem] object-fill rounded overflow-hidden shadow-md shadow-slate-300 bg-slate-300'>
                                                <img src={imageArray[0]} alt="" className='object-cover h-full w-full hover:scale-110 transition-all' />
                                            </div>

                                            <div className='p-2 w-[10rem] flex flex-col gap-2 '>

                                                <p className=' text-ellipsis line-clamp-1 font-semibold'>{name}</p>
                                                <p className='capitalize text-balance text-sm text-[#5b5959]'>{url.category}</p>

                                                <div className=' flex items-center gap-2 text-sm'>
                                                    <p className='flex items-center text-red-600 font-semibold'> <FaRupeeSign className='text-[.8rem]' />{url.price}.00</p>
                                                    <strike className='flex items-center text-[#504f4f]'><FaRupeeSign className='text-[.8rem]' /><pre className=' '>{url.Aprice}.00</pre></strike>
                                                </div>
                                                <Link to={''} className='bg-red-600 hover:bg-white border-2 hover:text-black hover:tracking-wider hover:font-semibold border-red-800 px-2 rounded-full text-center font-semibold text-white py-1 text-sm' >Add to Cart</Link>

                                            </div>
                                        </Link>
                                    )
                                })
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default HorizontalCartProduct