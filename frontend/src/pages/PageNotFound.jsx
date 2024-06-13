import React from 'react'
import Layouts from '../components/Layouts/Layouts.jsx';
const Pagenotfound = () => {
  return (
    <Layouts>
      <div className='pnf'>
        <h1 className='pnf-404'>404</h1>
        <p className='pnf-oopx'>Oops ! Page Not Found</p>
        <button className='pnf-btn'>Go Back</button>
      </div>
    </Layouts>
  )
}

export default Pagenotfound;