const express = require('express');
const { handleSignup, handleLogin } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', handleSignup);

router.post('/login', handleLogin);

module.exports = router;
