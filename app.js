const express = require('express');
const app = express();

const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

dotenv.config({ path: './config/config.env' });

connectDatabase();

const middleware = (req, res, next) => {
  console.log('middleware');
  req.requestMethod = req.method;
  next();
};

app.use(middleware);

const jobs = require('./routes/jobs.routes');

app.use('/api/v1', jobs);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
