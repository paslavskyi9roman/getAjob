const User = require('../models/user.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isMatched = await user.comparedPassword(req.body.currentPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect.', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});
