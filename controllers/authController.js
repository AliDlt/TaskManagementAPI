const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// Login route
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "ایمیل یا رمزعبور اشتباه می باشد." });
    }

    // Validate password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "ایمیل یا رمزعبور اشتباه می باشد." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Return token to client
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error : ${error}` });
  }
};

// Register route
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "کاربری با این ایمیل وجود دارد." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "کاربر با موفقیت ثبت نام شد." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error : ${error}` });
  }
};

module.exports = {
  login,
  register,
};
