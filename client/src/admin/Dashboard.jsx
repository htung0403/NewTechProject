import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashProfile from './components/DashProfile.jsx';
import DashSidebar from './components/DashSidebar.jsx';
import { useDispatch } from 'react-redux';
import DashPosts from './components/DashPosts.jsx';


export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
      if (token) {
        const tokenValue = token.split('=')[1];
        const decodedToken = JSON.parse(atob(tokenValue.split('.')[1]));
        const expiryTime = decodedToken.exp * 1000;
        if (Date.now() >= expiryTime) {
          dispatch(signOut());
          navigate('/dang-nhap');
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [dispatch, navigate]);
  return(
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Side bar */}
        <DashSidebar/>
      </div>
      {/* Profile */}
      {tab==='ho-so' && <DashProfile/>}
      {/* Post */}
      {tab === 'bai-dang' && <DashPosts/>}
    </div>
  )
}