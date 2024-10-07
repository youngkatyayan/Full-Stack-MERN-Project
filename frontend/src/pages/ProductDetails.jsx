import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
  const param = useParams()
  const [allResult, setAllResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const array = new Array(4).fill(4)
  const getData = async () => {
    try {
      if (param) {
        // const {id}=param
        const response = await axios.post('/api/v1/get-preview-id', param)
        if (response.data.success) {
          setAllResult(response.data.result)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      {
        loading ? (
          <div className=''>
            {
              array.map((_, index) => (
                <div key={index+4}>hh</div>
              ))
            }

          </div>
        ) : (
          <div className=''>
            {
              allResult && allResult.map((el,index)=>(
                <div key={index+el}></div>
              ))
            }
          </div>
        )
      }

    </>
  )
}

export default ProductDetails