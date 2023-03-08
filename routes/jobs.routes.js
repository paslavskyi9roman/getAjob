const express = require('express');
const router = express.Router();

const { getJobs, newJob, getJobsInRadius, updateJob, deleteJob, getJob, jobStats } = require('../controllers/jobsController');

const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/jobs').get(getJobs);
router.route('/job/:id/:slug').get(getJob);
router.route('/stats/:topic').get(jobStats);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/job/new').post(isAuthenticatedUser, newJob);
router.route('/job/:id').put(isAuthenticatedUser, updateJob);
router.route('/job/:id').delete(isAuthenticatedUser, deleteJob);

module.exports = router;
