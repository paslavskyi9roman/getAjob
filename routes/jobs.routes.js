const express = require('express');
const router = express.Router();

const { getJobs, newJob, getJobsInRadius, updateJob, deleteJob, getJob, jobStats, applyJob } = require('../controllers/jobsController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/jobs').get(getJobs);
router.route('/job/:id/:slug').get(getJob);
router.route('/stats/:topic').get(jobStats);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/job/new').post(isAuthenticatedUser, authorizeRoles('employer', 'admin'), newJob);
router.route('/job/:id').put(isAuthenticatedUser, updateJob);
router.route('/job/:id').delete(isAuthenticatedUser, deleteJob);
router.route('/job/:id/apply').put(isAuthenticatedUser, authorizeRoles('user'), applyJob);

module.exports = router;
