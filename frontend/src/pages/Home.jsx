import React, { useState, useEffect } from 'react';
import Layouts from '../components/Layouts/Layouts.jsx';
import axios from 'axios';

const Home = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const accessProduct = async () => {
      try {
        const response = await axios.get('/api/v1/get_product-data');
        console.log(response);
        if (response.data.success) {
          setResult(response.data.result);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    accessProduct();
  }, []); // The effect runs only once when the component mounts.

  return (
    <Layouts>
      
    </Layouts>
  );
};

export default Home;
