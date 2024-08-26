require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const User = require('./models/user-model');

const app = express();

// Middleware
app.use(express.json());
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all Domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

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
