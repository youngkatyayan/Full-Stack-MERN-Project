
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const HorVerCartPages = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const loadingList = new Array(data.length).fill(null)
    const [transform, setTransform] = useState(0)
    // console.log("first,",category)
    // const xyx=JSON.parse(category)
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
            <div className='bg-slate-100 my-5 px-8 py-5 relative'>
                <p className='text-2xl font-bold animated-text'>{heading}</p>

                <div className='absolute w-full h-full justify-between flex items-center px-6 top-6 left-1'>
                    <span className='z-10 font-semibold h-5 w-5 flex justify-center items-center border-r shadow-md  bg-gray-200 rounded-full' onClick={previousImage}><FaAngleLeft /></span>
                    <span className='z-10 font-semibold h-5 w-5 flex justify-center items-center border-r shadow-md bg-gray-200 rounded-full' onClick={nextImage}><FaAngleRight /></span>
                </div>

                <div className='flex gap-12 mt-4  cont transition-all ' ref={scrollElement}>

                    {
                        loading ? (
                            loadingList.map(el => (
                                <div key={el} className='w-[16rem] pb-2 h-[21rem] border-2 shadow-md  rounded-md flex flex-col bg-white animate-pulse' style={{ transform: `translateX(-${transform}px)` }}>

                                    <div className='h-full w-full rounded-md overflow-hidden shadow-md shadow-slate-300  transition-all animate-pulse bg-slate-200 '>
                                        {/* <img src={JSON.parse(url.productImage)} alt="" className='object-contain h-full w-full hover:scale-110 transition-all mix-blend-multiply' /> */}
                                    </div>

                                    <div className='p-2 w-full flex flex-col gap-2 '>

                                        <p className=' text-ellipsis line-clamp-2 font-semibold py-1 bg-slate-200'></p>
                                        <p className='capitalize text-balance text-sm text-[#5b5959] py-1 bg-slate-200'></p>

                                        <div className=' flex items-center gap-2 text-sm py-1 bg-slate-200'>
                                            <p className='flex items-center text-red-600 font-semibold py-1 bg-slate-200'> </p>
                                            <strike className='flex items-center text-[#504f4f] py-1 bg-slate-200'></strike>
                                        </div>

                                        <Link to={''} className=' hover:bg-white bg-slate-200 w-full  hover:font-semibold px-2 rounded-full text-center font-semibold text-white py-1 text-sm'></Link>

                                    </div>

                                </div>
                            ))
                        )
                            : (
                                data && data.map((url, index) => (

                                    <div key={url.category + 1 + index} className='min-w-[12.8rem] max-w-[13rem] pb-2 max-h-[23rem] border-2 shadow-md  rounded-md flex flex-col bg-white' style={{ transform: `translateX(-${transform}px)` }}>

                                        <div className='h-full w-full rounded-md overflow-hidden shadow-md shadow-slate-300 bg-slate-300 transition-all '>
                                            <img src={JSON.parse(url.productImage)} alt="" className='object-contain h-full w-full hover:scale-110 transition-all mix-blend-multiply' />
                                        </div>

                                        <div className='p-2 w-full flex flex-col gap-2 '>

                                            <p className=' text-ellipsis line-clamp-2 font-semibold'>{JSON.parse(url.image_Name)}</p>
                                            <p className='capitalize text-balance text-sm text-[#5b5959]'>{url.category}</p>

                                            <div className=' flex items-center gap-2 text-sm'>
                                                <p className='flex items-center text-red-600 font-semibold'> <FaRupeeSign className='text-[.8rem]' />{url.price}.00</p>
                                                <strike className='flex items-center text-[#504f4f]'><FaRupeeSign className='text-[.8rem]' /><pre className=' '>{url.Aprice}.00</pre></strike>
                                            </div>

                                            <Link to={''} className='bg-red-600 hover:bg-white border-2 w-full hover:text-black hover:font-semibold border-red-800 px-2 rounded-full text-center font-semibold text-white py-1 text-sm'>Add to Cart</Link>

                                        </div>

                                    </div>
                                    
                                )))
                    }
                </div>
            </div>
        </>
    )
}

export default HorVerCartPages