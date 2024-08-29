import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, 'Lỗi không xác minh'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Lỗi không xác minh'));
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (user.exp < currentTime) {
      res.clearCookie('access_token');
      return next(errorHandler(401, 'Phiên đăng nhập đã hết hạn'));
    }

    console.log('Verified User:', user); // Add this line
    req.user = user;
    next();
  });
};