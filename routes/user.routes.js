const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/user').post(isAuthenticatedUser, getUserProfile);

module.exports = router;
