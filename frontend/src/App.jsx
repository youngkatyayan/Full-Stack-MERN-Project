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
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
import AllProduct from './pages/AllProduct.jsx'
import Pagenotfound from './pages/PageNotFound.jsx'
import { useSelector } from 'react-redux'
import CategoryProduct from './components/helpers/CategoryProduct.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
const App = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role')
  const user = useSelector((state) => state?.user?.user);
  useEffect(() => {
    const token = localStorage.getItem('token');

    const isTokenExpired = (token) => {
      if (!token) return true;

      const expiryDate = new Date(0);
      try {
        expiryDate.setUTCSeconds(JSON.parse(atob(token.split('.')[1])).exp);
      } catch (error) {
        console.error('Error parsing token:', error);
        return true;
      }
      return expiryDate < new Date();
    };

    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);


  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/*' element={<Pagenotfound />}></Route>
        <Route path='/aboutpage' element={<AboutPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/adminpage' element={<AdminPage />}> </Route>
        <Route path='/adminpage/allusers' element={<Allusers />} />
        <Route path='/adminpage/allproject' element={<AllProduct />} />
        <Route path='/product-category/:categoryName' element={<CategoryProduct />} />
        <Route path='/product/:id' element={<ProductDetails />} />

      </Routes>
    </>
  )
}

export default App
