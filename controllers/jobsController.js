const Job = require('../models/job.model');

exports.getJobs = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'This route is work',
  });
};

exports.newJob = async (req, res, next) => {
  const job = await Job.create(req.body);

  res.status(200).json({
    success: true,
    message: 'Job has been created successfully',
    data: job,
  });
};
