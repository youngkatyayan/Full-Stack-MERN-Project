import React, { useState, useEffect } from 'react';
import Layouts from '../components/Layouts/Layouts.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BannerImages from './BannerImages.jsx';
import BestForm from './BestForm.jsx';
import HorizontalCartProduct from './HorizontalCartProduct.jsx';
import VerticalCartProduct from './VerticalCartProduct.jsx';
import HorVerCartPages from './HorVerCartPages.jsx';
const Home = () => {
  const [result, setResult] = useState([]);
  const [storeCategoryData, setStoreCategoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingCategory = new Array(12).fill(null)
  // console.log(storeCategoryData)
  const accessProduct = async () => {
    try {
      const response = await axios.get('/api/v1/getproduct-data');
      if (response.data.success) {
        setResult(response.data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const categoryProduct = async () => {
    try {
      const res = await axios.get('/api/v1/getdata_categorywise')
      if (res.data.success) {
        setStoreCategoryData(res.data.result)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return;
    }
  }

  useEffect(() => {
    accessProduct();
  }, []);

  useEffect(() => {
    categoryProduct()

  }, []);

  return (
    <Layouts>
      <div className='flex  md:gap-16 gap-5 object-fill px-8  py-5 cont overflow-x-scroll scroll-smooth '>
        {
          loading ? (
            loadingCategory.map((el, index) => {
              return (
                <div key={index} className='h-[120px] min-w-[120px] overflow-hidden group relative flex rounded-full  shadow-slate-400 shadow-md'>
                </div>
              ) 
            })

          ) :
            (
              storeCategoryData && storeCategoryData.map((item, index) => {
               const imageArray=JSON.parse(item.productImage)
                return (

                  <Link to={'/product-category/' + item?.category} key={index} className='flex '>

                    <div className='relative flex rounded-full  shadow-slate-400 shadow-md  md:max-h-[120px] max-h-[90px] min-w-[90px] md:min-w-[120px] overflow-hidden group' >
                      <img className='rounded-full object-contain hover:scale-125 transition-all mix-blend-multiply' src={imageArray[0]} height={80} width={120} alt="" />

                      <div className="absolute inset-0 flex items-center justify-center hover:shadow-md hover:shadow-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium`` capitalize">{item.category}</p>
                      </div>
                    </div>

                  </Link>
                )
              })
            )
        }
      </div>

      <div className='my-2'>
        <BannerImages />
      </div>

       <div className='my-2'>
        <HorizontalCartProduct category={'airpodes'} heading={"Top's Airpodes"} />
      </div>

     <div className='my-2'>
        <HorizontalCartProduct category={'watches'} heading={"Top's Watches"} />
      </div>

      <div className='my-2'>
        <VerticalCartProduct category={'mobile'} heading={"Mobiles"} />
      </div>

      <div className='my-2'>
        <HorVerCartPages category={'mouse'} heading={"Mouse"} />
      </div>

      <div className='my-2'>
        <VerticalCartProduct category={'processor'} heading={"Processor"} />
      </div>

      <div className=' px-5 my-2'>
        <HorVerCartPages category={'earphones'} heading={"Earphones"} />
      </div>

      <div className='my-2'>
        <VerticalCartProduct category={'refrigerator'} heading={"Refrigerator"} />
      </div>

      <div className='my-2'>
        <VerticalCartProduct category={'TV'} heading={"TV"} />
      </div>

      <div className=' my-2'>
        <HorVerCartPages category={'trimmers'} heading={"Trimmer"} />
      </div>
      
      <div className=' my-2'>
        <HorVerCartPages category={'speakers'} heading={"Speaker"} />
      </div>

      <div className='my-2'>
        <VerticalCartProduct category={'printers'} heading={"Printer"} />
      </div>

    </Layouts>
    // <>
    // k</>
  );
};


export default Home;
