const express = require('express');
const router = express.Router();

const { getJobs, newJob, getJobsInRadius } = require('../controllers/jobsController');

router.route('/jobs').get(getJobs);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/job/new').post(newJob);

module.exports = router;
