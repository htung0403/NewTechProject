const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error.js');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: 'Không tìm thấy token', requireLogin: true });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Token không hợp lệ', requireLogin: true });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (user.exp < currentTime) {
      res.clearCookie('access_token');
      return res.status(401).json({ message: 'Token đã hết hạn', requireLogin: true });
    }

    req.user = user;
    next();
  });
};

module.exports = { verifyToken };