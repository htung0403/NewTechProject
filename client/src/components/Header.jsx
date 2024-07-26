import { Button, Navbar, NavbarCollapse, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold'>
            <span>Nam Phước 1</span>
        </Link>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/gioithieu"} as={'div'}>
            <Link to='/gioithieu'>
              GIỚI THIỆU
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/chuongtrinh"} as={'div'}>
            <Link to='/chuongtrinh'>
              CHƯƠNG TRÌNH
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/dichvu"} as={'div'}>
            <Link to='/dichvu'>
              DỊCH VỤ
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/tuyensinh"} as={'div'}>
            <Link to='/tuyensinh'>
              TUYỂN SINH
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/phuhuynh"} as={'div'}>
            <Link to='/phuhuynh'>
              PHỤ HUYNH
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/hoatdong"} as={'div'}>
            <Link to='/hoatdong'>
              HOẠT ĐỘNG
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/lienhe"} as={'div'}>
            <Link to='/lienhe'>
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
        <div>
          <Button className='w-30 h-10 bg-zinc-300' outline color='gray' pill>
            ĐĂNG NHẬP
          </Button>
        </div>
    </Navbar>
  )
}
