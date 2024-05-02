const UserModel = require('../models/userModel');
const { isUserExist } = require('../method/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const secretKey = '4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d'; //static secret key as a hexadecimal value

exports.register = async (req, res) => {
  try {
    isUserExist(req.body.email).then(async isexist => {
      if (!isexist) {
        const user = new UserModel(req.body);
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        const savedUser = await user.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
      } else {
        res.status(208).json({ message: "Email id is already exist", user: null });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, secretKey, { 
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).json({ message: 'User Login Successfully', token, userData: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};