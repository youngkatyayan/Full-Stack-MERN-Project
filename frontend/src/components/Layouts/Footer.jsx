import React from 'react'
import { socialIcon } from '../common/index.jsx';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className=' py-2 bg-slate-50' style={{boxShadow:'0 0 5px 2px #ddd'}}>
      <div className='bg-grey w-full h-full py-1 flex items-center justify-center'>
        <p className='text-2xl flex footer-text'>Created By<pre className='text-2xl font-semibold text-orange-400'> Kanisk Katyayan </pre>| All right reserved.</p>
      </div>
      <div className='flex gap-3 items-center justify-center'>
        {
          socialIcon?.map((item,index)=>(
            <Link className={`text-2xl rounded-full ${item.animation}`} to={`${item.link}`} key={item.value}>{item.icon}</Link>
          ))
        }
      </div>
    </div>
  )
}

export default Footer