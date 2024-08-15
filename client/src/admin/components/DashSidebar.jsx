import React from 'react';
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
export default function DashSidebar() {
  const location= useLocation();
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search])
  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className='w-full md:w-56'>
      <SidebarItems>
        <SidebarItemGroup>
          <Link to='/dashboard?tab=ho-so'>
            <SidebarItem active={tab === 'ho-so'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
              Hồ sơ
            </SidebarItem>
          </Link>
          <SidebarItem active icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
            Đăng xuất
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}