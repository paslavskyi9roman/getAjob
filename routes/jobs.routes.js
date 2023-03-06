const express = require('express');
const router = express.Router();

const { getJobs, newJob, getJobsInRadius, updateJob } = require('../controllers/jobsController');

router.route('/jobs').get(getJobs);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/job/new').post(newJob);
router.route('/job/:id').put(updateJob);

module.exports = router;
