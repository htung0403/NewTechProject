import React from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://namphuoc1.edu.vn/api' 
    : 'http://localhost:3000/api';
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      const res = await fetch(`${API_URL}/user/signout`, {
        method: "POST",
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        navigate('/admin/dang-nhap');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=ho-so">
            <SidebarItem
              active={tab === "ho-so"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Quản trị viên" : "Thành viên"}
              labelColor="dark"
              as="div"
            >
              Hồ sơ
            </SidebarItem>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=bai-dang">
              <SidebarItem
                active={tab === "bai-dang"}
                icon={HiDocumentText}
                as="div"
              >
                Bài đăng
              </SidebarItem>
            </Link>
          )}

          <SidebarItem
            active
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Đăng xuất
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
