import React, { useEffect, useState } from 'react'
import img1 from '../assest/banner/img1.webp'
import img2 from '../assest/banner/img2.webp'
import img3 from '../assest/banner/img3.jpg'
import img4 from '../assest/banner/img5.webp'
import img5 from '../assest/banner/img4.jpg'

import img_mobile1 from '../assest/banner/img1_mobile.jpg'
import img_mobile2 from '../assest/banner/img2_mobile.webp'
import img_mobile3 from '../assest/banner/img3_mobile.jpg'
import img_mobile4 from '../assest/banner/img4_mobile.jpg'
import img_mobile5 from '../assest/banner/img5_mobile.png'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerImages = () => {
    const [transFormImage, setTransformImage] = useState(0)
    const images = [img1, img2, img3, img4, img5]
    const mobileImages = [img_mobile1, img_mobile2, img_mobile3, img_mobile4, img_mobile5]

    const previousImage = () => {
        setTransformImage(prev => {
            const newPos = prev - 100
            return newPos >= 0 ? newPos : 400
        })
    }


    const nextImage = () => {
        setTransformImage(prev => {
            const newPos = prev + 100;
            return newPos <= 400 ? newPos : 0; // Cycle between 0 and 400
        });
    };
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextImage(); 
        }, 2000); 

        return () => clearInterval(intervalId);
    }, []);
    
    
    return (
        <>
            <div className='mx-10 h-72  bg-slate-400 relative hidden md:flex'>
                <div className='absolute z-50 w-full h-full justify-between flex items-center '>
                    <span className='font-semibold h-5 w-5 flex justify-center items-center border-r shadow-md  bg-gray-200 rounded-full' onClick={previousImage}><FaAngleLeft /></span>
                    <span className='font-semibold h-5 w-5 flex justify-center items-center border-r shadow-md bg-gray-200 rounded-full' onClick={nextImage}><FaAngleRight /></span>
                </div>
                <div className='h-full w-full md:flex overflow-hidden hidden'>

                    {
                        images.map((url, i) => {
                            return (
                                <div className='w-full h-full min-w-full translate rounded transition-all' key={url + i} style={{ transform: `translateX(-${transFormImage}%)` }}>
                                    <img src={url} alt="" className='w-full h-full rounded' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='mx-3 h-[40vh]  bg-slate-400 relative md:hidden'>
                <div className='absolute z-50 w-full h-full justify-between flex items-center '>
                    <span className='font-semibold h-5 w-5 flex justify-center items-center  bg-white rounded-full' onClick={previousImage}><FaAngleLeft /></span>
                    <span className='font-semibold h-5 w-5 flex justify-center items-center bg-white rounded-full' onClick={nextImage}><FaAngleRight /></span>
                </div>
                <div className='h-full w-full flex overflow-hidden'>

                    {
                        mobileImages.map((url, i) => {
                            return (
                                <div className='w-full h-full min-w-full translate rounded' key={url + i} style={{ transform: `translateX(-${transFormImage}%)` }}>
                                    <img src={url} alt="" className='w-full h-full rounded' />

                                </div>
                            )
                        })
                    }
                    {/* <p>gtyyyuuiuihjkiouiytyrdtyugiojpkouiyutyty1</p> */}
                </div>
            </div>
        </>
    )
}

export default BannerImages