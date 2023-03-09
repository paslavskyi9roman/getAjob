const express = require('express');
const router = express.Router();

const { getUserProfile, updatePassword, updateUser, deleteUser, getPublishedJobs } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/user').post(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/user/update').put(isAuthenticatedUser, updateUser);
router.route('/user/delete').delete(deleteUser);
router.route('/jobs/applied').get(authorizeRoles('user'), getPublishedJobs);

module.exports = router;
