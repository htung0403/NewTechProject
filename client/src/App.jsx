import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GioiThieu from './pages/GioiThieu';
import DangKy from './admin/DangKy';
import Dashboard from './pages/Dashboard';
import LienHe from './pages/LienHe';
import TuyenSinh from './pages/TuyenSinh';
import DangNhap from './admin/DangNhap';
import PublicLayout from './layout/PublicLayout';
import AdminLayout from './layout/AdminLayout';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<PublicLayout><Home /></PublicLayout>} />
        <Route path='/gioi-thieu' element={<PublicLayout><GioiThieu /></PublicLayout>} />
        <Route path='/lien-he' element={<PublicLayout><LienHe /></PublicLayout>} />
        <Route path='/tuyensinh' element={<PublicLayout><TuyenSinh /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path='/admin/dang-ky' element={<AdminLayout><DangKy /></AdminLayout>} />
        <Route path='/admin' element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path='/admin/dang-nhap' element={<AdminLayout><DangNhap /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}