const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

module.exports = {
  signup: async (req, res, next) => {
    const { username, email, password, fullName, isAdmin } = req.body;

    if (!username || !email || !password || !fullName || username === "" || email === "" || fullName === "") {
      return next(errorHandler(400, "All fields required!"));
    }

    try {
      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Create a new user with default role 'phuhuynh'
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        fullName,
        isAdmin: false, // Default role
      });

      // Send a success response
      res.status(201).json({ message: "User created successfully." });
    } catch (error) {
      next(error);
    }
  },

  signin: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required"));
    }

    try {
      const validUser = await User.findOne({ where: { email } });
      if (!validUser) {
        return next(errorHandler(404, "User not found"));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, "Invalid password"));
      }
      const token = jwt.sign(
        { id: validUser.id, isAdmin: validUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // Ensure the token has an expiration time
      );
      const { password: pass, ...rest } = validUser.toJSON();

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })
        .json({ ...rest, token }); // Include the token in the response for debugging
    } catch (error) {
      next(error);
    }
  },
};