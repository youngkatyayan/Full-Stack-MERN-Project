import React from 'react'
import Layouts from '../components/Layouts/Layouts.jsx'
import AdminMenu from '../components/admin/AdminMenu.jsx'
const AllProduct = () => {
    return (
        <Layouts>
            <div className='min-h-[calc(100vh-4rem)] flex gap-5'>
                    <div className=''>
                        <AdminMenu />
                    </div>
                    <div className='w-full overflow-x-auto'>
                      
                    </div>
                </div>
        </Layouts>
    )
}

export default AllProduct