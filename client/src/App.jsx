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
import './index.css';



export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/gioi-thieu' element={<GioiThieu/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/lien-he' element={<LienHe/>} />
        <Route path='/tuyensinh' element={<TuyenSinh/>} />
      </Routes>
    </BrowserRouter>
  )
}
