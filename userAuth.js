const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const userSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await UserModel.create({ username, email, password });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user: ' + error.message });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUser = await UserModel.findOne({ username });
    if (!foundUser || !(await foundUser.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in: ' + error.message });
  }
};

module.exports = { userSignup, userLogin };
