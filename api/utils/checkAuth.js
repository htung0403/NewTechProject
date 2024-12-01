import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useCheckAuth = () => {
  useEffect(() => {
    const accessToken = Cookies.get('access_token');

    if (!accessToken) {
      console.log('No token found, redirecting to login');
      window.location.href = '/admin/dang-nhap'; // Sử dụng window.location để điều hướng
    }
  }, []);
};

export default useCheckAuth;