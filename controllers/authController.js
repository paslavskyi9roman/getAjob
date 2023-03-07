const User = require('../models/user.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    message: 'User registered successfully',
    token: token,
  });
});
