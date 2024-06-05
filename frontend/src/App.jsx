import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Login from './pages/Login.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import SignUp from './pages/SignUp.jsx'
import AdminPage from './components/admin/AdminPage.jsx'
const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/aboutpage' element={<AboutPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/adminpage' element={<AdminPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
