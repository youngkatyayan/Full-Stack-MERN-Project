import React from 'react'
import Layouts from '../Layouts/Layouts.jsx';
import AdminMenu from './AdminMenu.jsx';
// import Allusers from '../../pages/Allusers.jsx';
const AdminPage = () => {


    return (
        <>
            <Layouts>
                <div className='min-h-[calc(100vh-4rem)] flex gap-5'>
                    <div className=''>
                        <AdminMenu/>
                    </div>
                    <div className='w-full'>
                            <p>All Data</p>
                    </div>
                </div>
            </Layouts>
        </>
    );
};

export default AdminPage;
