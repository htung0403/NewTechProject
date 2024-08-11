import { Alert, Spinner } from 'flowbite-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice.js';


export default function DangNhap() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const navigate = useNavigate();
  const handleChage = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Vui lòng điền đầy đủ thông tin!'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/admin');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='mt-[3rem]'>
      <div className="flex justify-center">
        <div className="relative text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">
            ĐĂNG NHẬP TÀI KHOẢN
          </h1>
        <i className="mt-4 text-lg text-gray-600">Trường Tiểu học Nam Phước 1</i>
        </div>
      </div>

      <div className='mt-[3.5rem] flex justify-center'>
        {/* left */}
        <div className='md:w-[40%] w-full mx-4'>
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            <input 
              type="email" 
              id='email'
              placeholder="Email@gmail.com" 
              className="w-full rounded-full border p-2 focus:outline-none focus:ring focus:border-blue-300" 
              onChange={handleChage}
            />
            <input 
              type="password" 
              id='password'
              placeholder="*********" 
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
                ) : 'Đăng nhập'
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
          <span className="text-gray-700 font-medium">Quên mật khẩu ?</span>
          <span className="ml-2 text-gray-500">ĐĂNG KÝ</span>
          <Link to='/admin/dang-ky'>
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
