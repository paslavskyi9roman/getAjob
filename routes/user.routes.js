const express = require('express');
const router = express.Router();

const { getUserProfile, updatePassword, updateUser, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/user').post(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/user/update').put(isAuthenticatedUser, updateUser);
router.route('/user/delete').delete(deleteUser);

module.exports = router;
