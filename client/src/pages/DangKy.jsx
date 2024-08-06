import { Alert, Spinner } from 'flowbite-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function DangKy() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChage = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.fullName || !formData.password || !formData.checkPassword) {
      return setErrorMessage('Vui lòng điền đầy đủ thông tin!');
    }
    try{
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/dang-nhap')
      }
    }
    catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  return (
    <div className='min-h-screen mt-[3rem]'>
      <div className="flex justify-center">
        <div className="relative text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">
            ĐĂNG KÝ TÀI KHOẢN
          </h1>
        <i className="mt-4 text-lg text-gray-600">Trường Tiểu học Nam Phước 1</i>
        </div>
      </div>

      <div className='mt-[3.5rem] flex justify-center'>
        {/* left */}
        <div className='md:w-[40%] w-full mx-4'>
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            <input 
              type="text" 
              id='username'
              placeholder="Tên đăng nhập" 
              className="w-full rounded-full border p-2 focus:outline-none focus:ring focus:border-blue-300" 
              onChange={handleChage}
            />
            <input 
              type="email" 
              id='email'
              placeholder="Email@gmail.com" 
              className="w-full rounded-full border p-2 focus:outline-none focus:ring focus:border-blue-300" 
              onChange={handleChage}
            />
            <input 
              type="text" 
              id='fullName'
              placeholder="Họ và tên" 
              className="w-full rounded-full border p-2 focus:outline-none focus:ring focus:border-blue-300" 
              onChange={handleChage}
            />
            <input 
              type="password" 
              id='password'
              placeholder="Mật khẩu" 
              className="w-full rounded-full border p-2 focus:outline-none focus:ring focus:border-blue-300" 
              onChange={handleChage}
            />
            <input 
              type="password" 
              id='checkPassword'
              placeholder="Nhập lại mật khẩu" 
              className="w-full rounded-full border p-2 focus:outline-none focus:ring focus:border-blue-300" 
              onChange={handleChage}
            />
            <button className="bg-black text-white rounded-full px-4 py-2 flex items-center justify-center" disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Đăng ký'
              }
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
            {
              errorMessage && (
                <Alert className='flex justify-center items-center text-lg' color='failure'>
                  {errorMessage}
                </Alert>
              )
            }
          </form>
        </div>
      </div>
      
      <div className="flex justify-center items-center mt-10">
        <div className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2">
          <span className="text-gray-700 font-medium">Đã có tài khoản?</span>
          <span className="ml-2 text-gray-500">ĐĂNG NHẬP</span>
          <Link to='/dang-nhap'>
          <button className="bg-purple-500 text-white rounded-full ml-4 px-3 py-1 hover:bg-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
