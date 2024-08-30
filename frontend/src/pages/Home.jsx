import React, { useState, useEffect } from 'react';
import Layouts from '../components/Layouts/Layouts.jsx';
import axios from 'axios';
const Home = () => {
  const [result, setResult] = useState([]);
  const [storeCategoryData, setStoreCategoryData] = useState([])

  const accessProduct = async () => {
    try {
      const response = await axios.get('/api/v1/getproduct-data');
      if (response.data.success) {
        setResult(response.data.result);
        // console.log(response.data.result);
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
      // console.log(res.data.result);
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
      <div className='flex gap-16 object-fill px-8  py-5 cont overflow-x-scroll scroll-smooth '>
        {
          storeCategoryData && storeCategoryData.map((item, index) => (
            <div key={index} className='flex '>

              <div className='relative flex rounded-full  shadow-slate-400 shadow-md  max-h-[120px] min-w-[120px] overflow-hidden group' >
                <img className='rounded-full object-contain' src={JSON.parse(item.productImage)} height={80} width={120} alt="" />

                <div className="absolute inset-0 flex items-center justify-center hover:shadow-md hover:shadow-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium`` capitalize">{item.category}</p>
                </div>
              </div>

            </div>
          ))
        }
      </div>
      <div>
        {
          result && result.map((item,index)=>(
            <div>
              
            </div>
          ))
        }
      </div>
    </Layouts>
  );
};

export default Home;
