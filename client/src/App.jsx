import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import GioiThieu from './pages/GioiThieu'
import DangKy from './pages/DangKy'
import Dashboard from './pages/Dashboard'
import LienHe from './pages/LienHe'
import Header from './components/Header'
import TuyenSinh from './pages/TuyenSinh'
import './index.css';
import DangNhap from './pages/DangNhap'



export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/gioi-thieu' element={<GioiThieu/>} />
        <Route path='/dang-nhap' element={<DangNhap/>} />
        <Route path='/dang-ky' element={<DangKy/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/lien-he' element={<LienHe/>} />
        <Route path='/tuyensinh' element={<TuyenSinh/>} />
      </Routes>
    </BrowserRouter>
  )
}
