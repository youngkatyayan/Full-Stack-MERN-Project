import React, { useEffect } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import axios from 'axios'
import Context from '../../context/index.jsx'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../../store/userSlice.jsx'
const Layouts = (props) => {
    const dispatch = useDispatch()
    const handletoken = async () => {
        try {
            const token = await axios.get('/api/v1/get-details')
            dispatch(setUserDetails(token.data.result))
        } catch (error) {
            console.log("token", error.message)
        }
    }
    useEffect(() => {
        handletoken()
    }, [])
    return (
        <>
            <Context.Provider value={{ handletoken }}>
                <Header className='h-16 ' />
                <main style={{ minHeight: '85vh' }}>
                    {props.children}
                </main>
                <Footer />
            </Context.Provider>
        </>
    )
}

export default Layouts