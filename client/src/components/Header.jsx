import { Button, Navbar, NavbarCollapse, TextInput, Dropdown } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai'
import '../index.css';


export default function Header() {
  const path = useLocation().pathname;
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
          <Navbar.Link active={path === "/phuhuynh"} as={'div'}>
            <Link to='/phuhuynh' className='font-bold text-[16px] font-sans'>
              PHỤ HUYNH
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/hoatdong"} as={'div'}>
            <Link to='/hoatdong' className='font-bold text-[16px] font-sans'>
              HOẠT ĐỘNG
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/lienhe"} as={'div'}>
            <Link to='/lienhe' className='font-bold text-[16px] font-sans'>
              LIÊN HỆ
            </Link>
          </Navbar.Link>
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
    </Navbar>
  )
}
