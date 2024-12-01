import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashProfile from './components/DashProfile.jsx';
import DashSidebar from './components/DashSidebar.jsx';
import { useDispatch } from 'react-redux';
import DashPosts from './components/DashPosts.jsx';
import Cookies from 'js-cookie';
import { signOutSuccess } from '../redux/user/userSlice.js';
import useCheckAuth from "../../../api/utils/checkAuth";



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

  useCheckAuth();

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