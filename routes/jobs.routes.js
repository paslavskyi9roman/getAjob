const express = require('express');
const router = express.Router();

const { getJobs, newJob, getJobsInRadius, updateJob, deleteJob, getJob, jobStats } = require('../controllers/jobsController');

router.route('/jobs').get(getJobs);
router.route('/job/:id/:slug').get(getJob);
router.route('/stats/:topic').get(jobStats);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/job/new').post(newJob);
router.route('/job/:id').put(updateJob);
router.route('/job/:id').delete(deleteJob);

module.exports = router;
