import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password, fullName, role } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !fullName ||
    username === "" ||
    email === "" ||
    fullName === ""
  ) {
  next(errorHandler(400, 'All fields required!'));
}

  try {
    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user with default role 'phuhuynh'
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      role: role || "khach", // Default role
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    next(error);
  }
};