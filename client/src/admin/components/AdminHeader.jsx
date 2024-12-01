import { Button, Navbar, Dropdown, Avatar } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import '../../index.css';
import {useSelector, useDispatch} from 'react-redux'
import { signOutSuccess } from '../../redux/user/userSlice';
import logoImg from '../../images/logo.png'


export default function AdminHeader() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://namphuoc1.edu.vn/api' 
    : 'http://127.0.0.1:3005/api';
  const handleSignout = async () => {
    try {
      const res = await fetch(`${API_URL}/user/signout`, {
        method: 'POST',
        credentials: 'include'
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
        <Link to="/" className='self-center'>
          <img src={logoImg} alt="Logo" style={{ height: '4rem'}} className='h-16 sm:h-8 md:ml-[100px] ml-3' />
        </Link>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <div className='relative group'>
              <Link to='/create-post'>
                <div className='py-3 font-bold text-[16px] font-sans cursor-pointer'>
                  ĐĂNG BÀI VIẾT
                </div>
              </Link>
          </div>
          <div className='relative group'>
              <Link to='/upload-file'>
                <div className='py-3 font-bold text-[16px] font-sans cursor-pointer'>
                  ĐĂNG TỆP PDF (.pdf)
                </div>
              </Link>
          </div>
        </Navbar.Collapse>
        {currentUser? (
            <Dropdown
            arrowIcon= {false}
            inline
            label= {
                <Avatar
                className='cursor-pointer border-slate-600 border-2'
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
