import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import GioiThieu from './pages/GioiThieu'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import LienHe from './pages/LienHe'
import Header from './components/Header'
import TuyenSinh from './pages/TuyenSinh'


export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/gioithieu' element={<GioiThieu/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/lienhe' element={<LienHe/>} />
        <Route path='/tuyensinh' element={<TuyenSinh/>} />
      </Routes>
    </BrowserRouter>
  )
}
