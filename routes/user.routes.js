const express = require('express');
const router = express.Router();

const {
  getUserProfile,
  updatePassword,
  updateUser,
  deleteUser,
  getAppliedJobs,
  getPublishedJobs,
  getUsers,
  deleteUserAdmin,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.use(isAuthenticatedUser);

router.route('/user').post(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/user/update').put(isAuthenticatedUser, updateUser);
router.route('/user/delete').delete(deleteUser);
router.route('/jobs/applied').get(authorizeRoles('user'), getAppliedJobs);
router.route('/jobs/published').get(authorizeRoles('employeer', 'admin'), getPublishedJobs);

router.route('/users').get(authorizeRoles('admin'), getUsers);
router.route('/user/:id').delete(authorizeRoles('admin'), deleteUserAdmin);

module.exports = router;
