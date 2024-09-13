import React from 'react'
import { useParams } from 'react-router-dom'
import Layouts from '../Layouts/Layouts.jsx'
const CategoryProduct = () => {
    const params = useParams()

    return (
        <Layouts>
            <div>{params.categoryName}</div>
        </Layouts>
    )
}

export default CategoryProduct