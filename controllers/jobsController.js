const Job = require('../models/job.model');

const geoCoder = require('../utils/geocoder');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');

exports.getJobs = catchAsyncErrors(async (req, res, next) => {
  const apiFilters = new APIFilters(Job.find(), req.query).filter().sort();

  const jobs = await apiFilters.query;

  res.status(200).json({
    success: true,
    message: 'This route is work',
    results: jobs.length,
    data: jobs,
  });
});

exports.newJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.create(req.body);

  res.status(200).json({
    success: true,
    message: 'Job Created.',
    data: job,
  });
});

exports.getJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.find({ $and: [{ _id: req.params.id }, { slug: req.params.slug }] });

  if (!job || job.length === 0) {
    return next(new ErrorHandler('Job not found', 404));
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

exports.updateJob = catchAsyncErrors(async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler('Job not Found', 404));
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
});

exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler('Job not found', 404));
  }

  job = await Job.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Job deleted successfully',
  });
});

exports.getJobsInRadius = catchAsyncErrors(async (req, res, next) => {
  const { zipCode, distance } = req.params;

  const loc = await geoCoder.geocode(zipCode);
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
});

exports.jobStats = catchAsyncErrors(async (req, res, next) => {
  const status = await Job.aggregate([
    {
      $match: { $text: { $search: '"' + req.params.topic + '"' } },
    },
    {
      $group: {
        _id: { $toUpper: '$experience' },
        totalJobs: { $sum: 1 },
        avgSalary: {
          $avg: '$positions',
        },
        avgSalary: {
          $avg: '$salary',
        },
        minSalary: {
          $min: '$salary',
        },
        maxSalary: {
          $max: '$salary',
        },
      },
    },
  ]);

  if (status.length === 0) {
    return next(new ErrorHandler(`No stats found ${req.params.stats}`, 200));
  }

  res.status(200).json({
    success: true,
    data: stats,
  });
});
