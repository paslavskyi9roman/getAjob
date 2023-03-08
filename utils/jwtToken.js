const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 100),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

module.exports = sendToken;
