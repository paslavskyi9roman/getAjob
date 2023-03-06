const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const geoCoder = require('../utils/geocoder');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter job title'],
    trim: true,
    maxLength: [100, 'Job title can not exceed 100 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please enter job description'],
    maxLength: [1000, 'Job description can not exceed 1000 characters'],
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  address: {
    type: String,
    required: [true, 'Please enter address'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  company: {
    type: String,
    required: [true, 'Please enter company name'],
  },
  category: {
    type: [String],
    required: [true, 'Please enter category'],
    enum: {
      values: ['Front-end', 'Back-end', 'Full-stack', 'Devops', 'Mobile', 'Machine Learning', 'Data Science'],
      message: 'Please select options for categories',
    },
  },
  jobType: {
    type: String,
    required: [true, 'Please enter job type'],
    enum: {
      values: ['Full-time', 'Partial', 'Freelance'],
      message: 'Please select options for job title',
    },
  },
  experience: {
    type: String,
    required: true,
    enum: {
      values: ['No expirience', '0-1 years', '1-2 years', '2-3 years', '3-5 years', '5+ years'],
      message: 'Please select options for expirience',
    },
  },
  salary: {
    type: Number,
    required: [true, 'Please enter expected salary for this job'],
  },
  postingDate: {
    type: Date,
    default: Date.now,
  },
  applicantsApplied: {
    type: [Object],
    select: false,
  },
});

jobSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lowercase: true });

  next();
});

jobSchema.pre('save', async function (next) {
  const loc = await geoCoder.geocode(this.address);

  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipCode,
    country: loc[0].countryCode,
  };
});

module.exports = mongoose.model('Job', jobSchema);
