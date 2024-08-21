require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const User = require('./models/userModel');

const app = express();

// Middleware
app.use(express.json());

// Route Handler
app.use(userRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    //  Creating admin users
    const existingAdimn = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (!existingAdimn) {
      const admin = new User({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
        role: 'admin',
      });
      await admin.save();
    }

    app.listen(4000, () => {
      console.log('Listening...');
    });
  })
  .catch((error) => {
    console.log(error);
  });
