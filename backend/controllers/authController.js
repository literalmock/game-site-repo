const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {profileEditSchema} = require('../utils/validation');
const signup = async (req, res) => {
  try {
    const { fullname, username, email, password , confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingUser = await User.findOne({username});
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const existingEmail = await User.findOne({email});
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const emailValidation = profileEditSchema.safeParse({ email });
  if (!emailValidation.success) {
    return res.status(400).send("Enter a valid email");
  }
  if (!password) {
    return res.status(400).send("Invalid password");
  }
  try {
    //User exists
    const isExistingUser = await User.findOne({ email });
    if (!isExistingUser) {
      return res.status(400).send("User Does Not Exist");
    }
    //use bcrypt to compare password
    const userdetail = await User.findOne({ email: email });
    const auth = await bcrypt.compare(password, userdetail.password);
    if (!auth) {
      return res.status(401).send("Password is Wrong");
    }
    // jwt authorization
    const token = await jwt.sign({ _id: userdetail._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token" , token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    return res.status(200).json({ message: "Login successful", userdetail });
  } catch (err) {
    console.log(err);
    return res.status(500).send("some error occured");
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

const getProfile = (req, res) => {
  //remove password from user object before sending response
  const userWithoutPassword = { ...req.user._doc };
  delete userWithoutPassword.password;
  return res.status(200).json({ user: userWithoutPassword });
};

const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { fullname, username, email, about, photoURL } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullname, username, about, photoURL },
      { new: true }
    ).select('-password');
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
const forgotPassword = (req, res) => {
    res.send("Forgot password route")
    if (!email) {
      return res.status(400).send("Enter a valid email");
    }
    // Implement password reset logic here (e.g., send reset link to email)
}
module.exports = {
  signup,
  login,
  logout,
  getProfile,
  updateProfile
};