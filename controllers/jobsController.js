const Job = require('../models/job.model');

const geoCoder = require('../utils/geocoder');

exports.getJobs = async (req, res, next) => {
  const jobs = await Job.find();

  res.status(200).json({
    success: true,
    message: 'This route is work',
    results: jobs.length,
    data: jobs,
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

exports.updateJob = async (req, res, next) => {
  let job = Job.findById(req.params.id);

  if (!job) {
    res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Job updated successfully',
    data: job,
  });
};

exports.getJobsInRadius = async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geoCoder.geocode(zipcode);
  const latitude = loc[0].latitude;
  const longitude = loc[0].longitude;
  const radius = distance / 3963;

  const jobs = await Job.find({
    location: { $geoWithin: { $centerSphere: [[longitude, latitude], radius] } },
  });

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
  });
};
