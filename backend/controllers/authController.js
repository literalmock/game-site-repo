const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { fullName, username, email, password , confirmPassword } = req.body;

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
  try {
    const { username, password } = req.body; 
    }
    catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
    
};

module.exports = {
  signup,
  login
};