const express = require('express');
const router = express.Router();

const { getUserProfile, updatePassword } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/user').post(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

module.exports = router;
