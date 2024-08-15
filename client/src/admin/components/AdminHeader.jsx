import { Button, Navbar, NavbarCollapse, TextInput, Dropdown, Avatar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai'
import '../../index.css';
import {useSelector, useDispatch} from 'react-redux'
import { signOutSuccess } from '../../redux/user/userSlice';


export default function AdminHeader() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

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
    <Navbar className='border-b-2 py-4 relative z-50'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold'>
          <img src="../images/logo.png" alt="Logo" className='h-8 sm:h-10' />
        </Link>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <div className="relative group">
            <div className='py-3 font-bold text-[16px] font-sans cursor-pointer'>
              GIỚI THIỆU
            </div>
            <div className="absolute hidden group-hover:block bg-white shadow-lg w-60">
              <div className="py-1">
                <Link to='/gioi-thieu/thu-ngo' className='block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300'>
                  THƯ NGÕ
                </Link>
              </div>
              <div className="py-1 relative sub-menu">
              <div className='px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300 cursor-pointer flex justify-between items-center'>
                CƠ CẤU TỔ CHỨC
                <AiOutlineRight />
              </div>
              <div className="absolute left-full top-0 hidden sub-menu-hover:block bg-white shadow-lg w-60">
                <div className="py-1">
                  <Link to='/gioi-thieu/co-cau-to-chuc/thuong-truc-hoi-cmhs' className='block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300'>
                    THƯỜNG TRỰC HỘI CMHS
                  </Link>
                </div>
                <div className="py-1">
                  <Link to='/gioi-thieu/co-cau-to-chuc/cac-to-chuyen-mon' className='block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300'>
                    CÁC TỔ CHUYÊN MÔN
                  </Link>
                </div>
                <div className="py-1">
                  <Link to='/gioi-thieu/co-cau-to-chuc/ban-chi-huy-lien-doi' className='block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300'>
                    BAN CHỈ HUY LIÊN ĐỘI
                  </Link>
                </div>
                <div className="py-1">
                  <Link to='/gioi-thieu/co-cau-to-chuc/ban-chap-hanh-cong-doan' className='block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300'>
                    BAN CHẤP HÀNH CÔNG ĐOÀN
                  </Link>
                </div>
                <div className="py-1">
                  <Link to='/gioi-thieu/co-cau-to-chuc/ban-giam-hieu' className='block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300'>
                    BAN GIÁM HIỆU
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className='relative group'>
            <div className='py-3 font-bold text-[16px] font-sans cursor-pointer'>
              CHƯƠNG TRÌNH
            </div>
            <div className="absolute hidden group-hover:block bg-white shadow-lg w-60">
              <div className="py-2">
                <Link to='/chuong-trinh/chuong-trinh-tieu-chuan-bo-gddt' className='block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-200'>
                CHƯƠNG TRÌNH TIÊU CHUẨN BỘ GIÁO DỤC VÀ ĐÀO TẠO.
                </Link>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
        <form>
          <TextInput
            type='text'
            placeholder='Tìm kiếm...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            >

          </TextInput>
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch/>
        </Button>
        {currentUser? (
            <Dropdown
            arrowIcon= {false}
            inline
            label= {
                <Avatar
                alt='user' 
                img={currentUser.profilePicture}
                rounded/>
            }>
                <Dropdown.Header>
                    <span className='block text-sm'>@{currentUser.username}</span>
                    <span className='block text-sm font-medium truncate'>{currentUser.fullName}</span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=ho-so'}>
                    <Dropdown.Item>
                        Hồ sơ
                    </Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handleSignout}>Đăng xuất</Dropdown.Item>
            </Dropdown>
        ): (
            <Link to='/admin/dang-nhap'>
                <Button gradientDuoTone='purpleToBlue' outline>
                    Đăng nhập
                </Button>
            </Link>
        )
        }
    </Navbar>
  )
}
