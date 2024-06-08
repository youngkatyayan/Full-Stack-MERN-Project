import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Spinner = () => {
    const navigate = useNavigate()
    const [count, setCount] = useState(3)
    useEffect(() => {
        const counter=setInterval(()=>{
             setCount((prev)=>--prev)
             },1000)
            count===0 && navigate('/allusers')
         return ()=> clearInterval(counter)
    
         }, [count,navigate])
       

    return (
        <>
            <div className='mx-auto    p-5 flex flex-col gap-2 items-center mt-[8vh]'>
                <button type="button" className="flex flex-col gap-3" disabled>
                    <div className='animate-spin w-10 h-10 rounded-full border-4 border-y-slate-900'></div>
                    <p className='text-md font-medium'>Loading...</p>
                </button>
                <p>Please wait for {count} seconds</p>
            </div>
        </>
    )
}

export default Spinner