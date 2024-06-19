import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Login from './pages/Login.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import SignUp from './pages/SignUp.jsx'
import AdminPage from './components/admin/AdminPage.jsx'
import Allusers from './pages/Allusers.jsx'
// import { useNavigate } from 'react-router-dom'
import AllProduct from './pages/AllProduct.jsx'
import Pagenotfound from './pages/PageNotFound.jsx'
import { useSelector } from 'react-redux'
const App = () => {
  const role = sessionStorage.getItem('role')
  const user = useSelector((state) => state?.user?.user);
  if (user == null) {
    sessionStorage.removeItem('role')
  }
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/*' element={<Pagenotfound />}></Route>
        <Route path='/aboutpage' element={<AboutPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/signup' element={<SignUp />}></Route>
        {role ?
          <Route path='/adminpage' element={<AdminPage />}> </Route> : '/'
        }
        {role ?
          <Route path='/adminpage/allusers' element={<Allusers />} /> : '/'
        }
        <Route path='/adminpage/allproject' element={<AllProduct />} />

      </Routes>
    </>
  )
}

export default App
