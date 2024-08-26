require('dotenv').config();
const util = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/user-model');

// Returns a version that returns promises.
const jwtSign = util.promisify(jwt.sign);

// Validate the incoming data (Part 1)
const schema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().alphanum().min(8),
  // role: Joi.string().valid('user', 'admin').optional(),
});

const handleSignup = async (req, res) => {
  const { email, password } = req.body;

  // Validate the incoming data (Part 2)
  try {
    await schema.validateAsync({
      email,
      password,
    });
  } catch (err) {
    return res.status(422).json(err);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ mssg: 'Email is already used.' });

  const user = new User({ email, password });
  console.log(user);
  await user.save();

  const token = await jwtSign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({ email, token });
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exist
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ mssg: 'User not found' });

  // If he exist match password
  const isMatched = await bcrypt.compare(password, user.password);
  console.log(isMatched);

  if (isMatched) {
    // Correct Email and Pass
    // Create a token
    const token = await jwtSign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ email, token });
  } else {
    res.status(406).json({ mssg: 'Invalid email or password' });
  }
};

module.exports = { handleSignup, handleLogin };
